package at.hamta.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import net.coobird.thumbnailator.Thumbnails;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Iterator;
import java.util.Locale;
import java.util.concurrent.TimeUnit;
import java.util.UUID;

@ApplicationScoped
public class ImageService {

    private static final int MAX_WIDTH = 1200;
    private static final int MAX_HEIGHT = 1200;
    private static final float WEBP_QUALITY = 0.85f;
    private static final int MIN_WEBP_BYTES = 32;
    private static final long MAX_PIXELS = 50_000_000L;
    public static final int MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

    static {
        System.setProperty("java.awt.headless", "true");
        ImageIO.setUseCache(false);
    }

    @Inject
    S3Client s3Client;

    @ConfigProperty(name = "minio.bucket-name")
    String bucketName;

    @ConfigProperty(name = "minio.public-url")
    String publicUrl;

    @ConfigProperty(name = "image.webp.encoder", defaultValue = "cwebp")
    String webpEncoder;

    /**
     * Nimmt ein Bild entgegen, resized es auf max. 1200px (längste Seite),
     * konvertiert es in WebP und lädt es nach MinIO hoch.
     *
     * @param inputStream  Der Datei-Stream des hochgeladenen Bildes
     * @param category     Kategorie (vorspeise / hauptspeise / nachspeise)
     * @return             Informationen zum gespeicherten Bild
     */
    public UploadedImage uploadImage(InputStream inputStream, String category)
            throws IOException, InvalidImageException {
        byte[] sourceBytes = readUploadBytes(inputStream);
        BufferedImage source = decodeImage(sourceBytes);

        // 1. Resize: längste Seite auf MAX_WIDTH/MAX_HEIGHT begrenzen
        BufferedImage resized = Thumbnails.of(source)
                .size(MAX_WIDTH, MAX_HEIGHT)
                .keepAspectRatio(true)
                .asBufferedImage();
        BufferedImage normalized = normalizeToRgb(resized);

        // 2. WebP-Encoding via cwebp keeps native encoder failures outside the JVM.
        byte[] webpBytes = encodeWebp(normalized);

        // 3. S3-Key: category/uuid.webp
        String key = sanitizeCategory(category) + "/" + UUID.randomUUID() + ".webp";

        // 4. Upload nach MinIO
        putAndVerify(key, webpBytes);

        // 5. Öffentliche URL zurückgeben (Format: http://host:9000/bucket/key)
        return new UploadedImage(
                publicUrlWithoutTrailingSlash() + "/" + bucketName + "/" + key,
                key,
                webpBytes.length
        );
    }

    public void deleteImage(String key) {
        if (key == null || key.isBlank()) {
            return;
        }
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build());
    }

    private byte[] readUploadBytes(InputStream inputStream) throws IOException, InvalidImageException {
        if (inputStream == null) {
            throw new InvalidImageException("No file provided");
        }

        byte[] bytes = inputStream.readNBytes(MAX_UPLOAD_BYTES + 1);
        if (bytes.length == 0) {
            throw new InvalidImageException("Image file is empty");
        }
        if (bytes.length > MAX_UPLOAD_BYTES) {
            throw new InvalidImageException("Image file is too large. Maximum size is 10 MB");
        }
        if (!hasSupportedSourceMagic(bytes)) {
            throw new InvalidImageException("Only JPG, PNG or GIF images are supported");
        }
        return bytes;
    }

    private BufferedImage decodeImage(byte[] bytes) throws IOException, InvalidImageException {
        try (ImageInputStream imageInput = ImageIO.createImageInputStream(new ByteArrayInputStream(bytes))) {
            if (imageInput == null) {
                throw new InvalidImageException("Image file could not be read");
            }

            Iterator<ImageReader> readers = ImageIO.getImageReaders(imageInput);
            if (!readers.hasNext()) {
                throw new InvalidImageException("Image format is not supported");
            }

            ImageReader reader = readers.next();
            try {
                reader.setInput(imageInput, true, true);
                int width = reader.getWidth(0);
                int height = reader.getHeight(0);
                validateDimensions(width, height);

                BufferedImage image = reader.read(0);
                if (image == null) {
                    throw new InvalidImageException("Image file could not be decoded");
                }
                return image;
            } finally {
                reader.dispose();
            }
        }
    }

    private void validateDimensions(int width, int height) throws InvalidImageException {
        if (width <= 0 || height <= 0) {
            throw new InvalidImageException("Image dimensions are invalid");
        }
        if ((long) width * (long) height > MAX_PIXELS) {
            throw new InvalidImageException("Image dimensions are too large");
        }
    }

    private BufferedImage normalizeToRgb(BufferedImage image) {
        BufferedImage rgb = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = rgb.createGraphics();
        try {
            graphics.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
            graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
            graphics.setColor(Color.WHITE);
            graphics.fillRect(0, 0, rgb.getWidth(), rgb.getHeight());
            graphics.drawImage(image, 0, 0, null);
        } finally {
            graphics.dispose();
        }
        return rgb;
    }

    private byte[] encodeWebp(BufferedImage image) throws IOException {
        Path inputPng = Files.createTempFile("hamta-upload-", ".png");
        Path outputWebp = Files.createTempFile("hamta-upload-", ".webp");

        try {
            if (!ImageIO.write(image, "png", inputPng.toFile())) {
                throw new IOException("Could not prepare image for WebP encoding");
            }

            Process process = new ProcessBuilder(
                    webpEncoderCommand(),
                    "-quiet",
                    "-q", String.valueOf(Math.round(WEBP_QUALITY * 100)),
                    "-mt",
                    inputPng.toString(),
                    "-o", outputWebp.toString()
            ).redirectErrorStream(true).start();

            boolean finished = process.waitFor(30, TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                throw new IOException("WebP encoding timed out");
            }

            byte[] encoderOutput = process.getInputStream().readAllBytes();
            if (process.exitValue() != 0) {
                throw new IOException("WebP encoding failed" + encoderMessage(encoderOutput));
            }

            byte[] webpBytes = Files.readAllBytes(outputWebp);
            if (webpBytes.length < MIN_WEBP_BYTES || !isWebp(webpBytes)) {
                throw new IOException("Encoded WebP image is invalid");
            }
            return webpBytes;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("WebP encoding interrupted", e);
        } finally {
            Files.deleteIfExists(inputPng);
            Files.deleteIfExists(outputWebp);
        }
    }

    private String webpEncoderCommand() {
        return webpEncoder == null || webpEncoder.isBlank() ? "cwebp" : webpEncoder;
    }

    private String encoderMessage(byte[] output) {
        if (output.length == 0) {
            return "";
        }
        return ": " + new String(output, StandardCharsets.UTF_8).trim();
    }

    private void putAndVerify(String key, byte[] webpBytes) {
        try {
            s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .contentType("image/webp")
                            .contentLength((long) webpBytes.length)
                            .build(),
                    RequestBody.fromBytes(webpBytes)
            );

            HeadObjectResponse stored = s3Client.headObject(HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build());
            if (stored.contentLength() == null || stored.contentLength() != webpBytes.length) {
                throw new IllegalStateException("Uploaded image size could not be verified");
            }
        } catch (RuntimeException e) {
            try {
                deleteImage(key);
            } catch (RuntimeException ignored) {
                // Preserve the original storage error.
            }
            throw e;
        }
    }

    private boolean hasSupportedSourceMagic(byte[] bytes) {
        return isJpeg(bytes) || isPng(bytes) || isGif(bytes);
    }

    private boolean isJpeg(byte[] bytes) {
        return bytes.length >= 3
                && (bytes[0] & 0xff) == 0xff
                && (bytes[1] & 0xff) == 0xd8
                && (bytes[2] & 0xff) == 0xff;
    }

    private boolean isPng(byte[] bytes) {
        return bytes.length >= 8
                && (bytes[0] & 0xff) == 0x89
                && bytes[1] == 0x50
                && bytes[2] == 0x4e
                && bytes[3] == 0x47
                && bytes[4] == 0x0d
                && bytes[5] == 0x0a
                && bytes[6] == 0x1a
                && bytes[7] == 0x0a;
    }

    private boolean isGif(byte[] bytes) {
        return bytes.length >= 6
                && bytes[0] == 0x47
                && bytes[1] == 0x49
                && bytes[2] == 0x46
                && bytes[3] == 0x38
                && (bytes[4] == 0x37 || bytes[4] == 0x39)
                && bytes[5] == 0x61;
    }

    private boolean isWebp(byte[] bytes) {
        return bytes.length >= 12
                && bytes[0] == 0x52
                && bytes[1] == 0x49
                && bytes[2] == 0x46
                && bytes[3] == 0x46
                && bytes[8] == 0x57
                && bytes[9] == 0x45
                && bytes[10] == 0x42
                && bytes[11] == 0x50;
    }

    private String sanitizeCategory(String category) {
        String safe = category == null ? "" : category.trim().toLowerCase(Locale.ROOT);
        safe = safe.replaceAll("[^a-z0-9_-]+", "-").replaceAll("^-+|-+$", "");
        return safe.isBlank() ? "general" : safe;
    }

    private String publicUrlWithoutTrailingSlash() {
        return publicUrl.endsWith("/") ? publicUrl.substring(0, publicUrl.length() - 1) : publicUrl;
    }

    public record UploadedImage(String url, String key, int contentLength) {
    }

    public static class InvalidImageException extends Exception {
        public InvalidImageException(String message) {
            super(message);
        }
    }
}
