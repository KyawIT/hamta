package at.hamta.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import net.coobird.thumbnailator.Thumbnails;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.UUID;

@ApplicationScoped
public class ImageService {

    private static final int MAX_WIDTH = 1200;
    private static final int MAX_HEIGHT = 1200;
    private static final float WEBP_QUALITY = 0.85f;

    @Inject
    S3Client s3Client;

    @ConfigProperty(name = "minio.bucket-name")
    String bucketName;

    @ConfigProperty(name = "minio.public-url")
    String publicUrl;

    /**
     * Nimmt ein Bild entgegen, resized es auf max. 1200px (längste Seite),
     * konvertiert es in WebP und lädt es nach MinIO hoch.
     *
     * @param inputStream  Der Datei-Stream des hochgeladenen Bildes
     * @param category     Kategorie (vorspeise / hauptspeise / nachspeise)
     * @return             Öffentliche URL des gespeicherten Bildes
     */
    public String uploadImage(InputStream inputStream, String category) throws Exception {
        // 1. Resize: längste Seite auf MAX_WIDTH/MAX_HEIGHT begrenzen
        BufferedImage resized = Thumbnails.of(inputStream)
                .size(MAX_WIDTH, MAX_HEIGHT)
                .keepAspectRatio(true)
                .asBufferedImage();

        // 2. WebP-Encoding via webp-imageio (registriert sich als ImageIO-SPI)
        byte[] webpBytes;
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            boolean written = ImageIO.write(resized, "webp", baos);
            if (!written) {
                throw new IllegalStateException(
                    "Kein WebP-Writer gefunden. Stelle sicher dass 'webp-imageio' im Classpath ist.");
            }
            webpBytes = baos.toByteArray();
        }

        // 3. S3-Key: category/uuid.webp
        String key = category + "/" + UUID.randomUUID() + ".webp";

        // 4. Upload nach MinIO
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .contentType("image/webp")
                        .contentLength((long) webpBytes.length)
                        .build(),
                RequestBody.fromBytes(webpBytes)
        );

        // 5. Öffentliche URL zurückgeben (Format: http://host:9000/bucket/key)
        return publicUrl + "/" + bucketName + "/" + key;
    }
}
