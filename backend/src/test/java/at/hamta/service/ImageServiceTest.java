package at.hamta.service;

import org.junit.jupiter.api.Test;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ImageServiceTest {

    @Test
    void rejectsNonImagesBeforeWritingToStorage() {
        FakeS3 fakeS3 = new FakeS3();
        ImageService service = service(fakeS3);

        assertThrows(
                ImageService.InvalidImageException.class,
                () -> service.uploadImage(
                        new ByteArrayInputStream("not actually an image".getBytes(StandardCharsets.UTF_8)),
                        "gallery")
        );

        assertEquals(0, fakeS3.putCount);
        assertEquals(0, fakeS3.headCount);
        assertEquals(0, fakeS3.deleteCount);
    }

    @Test
    void storesValidImagesAsVerifiedWebpUnderASafeKey() throws Exception {
        FakeS3 fakeS3 = new FakeS3();
        ImageService service = service(fakeS3);
        byte[] jpeg = imageBytes();

        ImageService.UploadedImage uploaded = service.uploadImage(
                new ByteArrayInputStream(jpeg),
                "../Desserts!!"
        );

        assertEquals(1, fakeS3.putCount);
        assertEquals(1, fakeS3.headCount);
        assertEquals(0, fakeS3.deleteCount);
        assertTrue(uploaded.key().matches("desserts/[0-9a-f-]{36}\\.webp"));
        assertEquals("http://minio:9000/images/" + uploaded.key(), uploaded.url());
        assertEquals("image/webp", fakeS3.contentType);
        assertEquals(uploaded.contentLength(), fakeS3.body.length);
        assertTrue(fakeS3.body.length > 32);
        assertNotEquals(jpeg.length, fakeS3.body.length);
        assertArrayEquals(new byte[]{'R', 'I', 'F', 'F'}, firstBytes(fakeS3.body, 4));
        assertArrayEquals(new byte[]{'W', 'E', 'B', 'P'}, slice(fakeS3.body, 8, 12));
    }

    @Test
    void removesObjectWhenStorageVerificationFails() throws Exception {
        FakeS3 fakeS3 = new FakeS3();
        fakeS3.failHead = true;
        ImageService service = service(fakeS3);

        assertThrows(
                RuntimeException.class,
                () -> service.uploadImage(new ByteArrayInputStream(imageBytes()), "gallery")
        );

        assertEquals(1, fakeS3.putCount);
        assertEquals(1, fakeS3.headCount);
        assertEquals(1, fakeS3.deleteCount);
    }

    private static ImageService service(FakeS3 fakeS3) {
        ImageService service = new ImageService();
        service.s3Client = fakeS3.client();
        service.bucketName = "images";
        service.publicUrl = "http://minio:9000/";
        service.webpEncoder = fakeWebpEncoder().toString();
        return service;
    }

    private static Path fakeWebpEncoder() {
        try {
            Path encoder = Files.createTempFile("fake-cwebp-", ".sh");
            Files.writeString(
                    encoder,
                    """
                    #!/bin/sh
                    out=""
                    while [ "$#" -gt 0 ]; do
                      if [ "$1" = "-o" ]; then
                        shift
                        out="$1"
                      fi
                      shift
                    done
                    [ -n "$out" ] || exit 2
                    printf 'RIFFxxxxWEBPfake-webp-payload-1234567890' > "$out"
                    """.stripLeading(),
                    StandardCharsets.UTF_8
            );
            encoder.toFile().setExecutable(true);
            return encoder;
        } catch (Exception e) {
            throw new IllegalStateException("Could not create fake WebP encoder", e);
        }
    }

    private static byte[] imageBytes() throws Exception {
        return Files.readAllBytes(Path.of("../assets/beef-tartare.jpeg"));
    }

    private static byte[] firstBytes(byte[] bytes, int length) {
        return slice(bytes, 0, length);
    }

    private static byte[] slice(byte[] bytes, int start, int end) {
        byte[] result = new byte[end - start];
        System.arraycopy(bytes, start, result, 0, result.length);
        return result;
    }

    private static final class FakeS3 implements InvocationHandler {
        int putCount;
        int headCount;
        int deleteCount;
        boolean failHead;
        String contentType;
        byte[] body = new byte[0];

        S3Client client() {
            return (S3Client) Proxy.newProxyInstance(
                    S3Client.class.getClassLoader(),
                    new Class<?>[]{S3Client.class},
                    this
            );
        }

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            return switch (method.getName()) {
                case "putObject" -> putObject(args);
                case "headObject" -> headObject();
                case "deleteObject" -> deleteObject();
                case "serviceName" -> "s3";
                case "close" -> null;
                case "toString" -> "FakeS3";
                case "hashCode" -> System.identityHashCode(proxy);
                default -> {
                    if (method.isDefault()) {
                        yield InvocationHandler.invokeDefault(proxy, method, args);
                    }
                    throw new UnsupportedOperationException(method.toString());
                }
            };
        }

        private PutObjectResponse putObject(Object[] args) throws Exception {
            putCount++;
            PutObjectRequest request = (PutObjectRequest) args[0];
            RequestBody requestBody = (RequestBody) args[1];
            contentType = request.contentType();
            try (InputStream input = requestBody.contentStreamProvider().newStream()) {
                body = input.readAllBytes();
            }
            return PutObjectResponse.builder().eTag("test").build();
        }

        private HeadObjectResponse headObject() {
            headCount++;
            if (failHead) {
                throw new RuntimeException("head failed");
            }
            return HeadObjectResponse.builder()
                    .contentType(contentType)
                    .contentLength((long) body.length)
                    .build();
        }

        private DeleteObjectResponse deleteObject() {
            deleteCount++;
            return DeleteObjectResponse.builder().build();
        }
    }
}
