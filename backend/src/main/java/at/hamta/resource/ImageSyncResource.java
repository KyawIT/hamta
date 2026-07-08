package at.hamta.resource;

import at.hamta.entity.Image;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.util.ArrayList;
import java.util.List;

@Path("/api/images/sync")
public class ImageSyncResource {

    @Inject
    S3Client s3Client;

    @ConfigProperty(name = "minio.bucket-name")
    String bucketName;

    @ConfigProperty(name = "minio.public-url")
    String publicUrl;

    /**
     * Liest alle Objekte aus dem MinIO-Bucket und speichert
     * fehlende URLs in der image-Tabelle.
     *
     * POST /api/images/sync
     */
    @POST
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response sync() {
        List<S3Object> objects = s3Client.listObjectsV2(
                ListObjectsV2Request.builder()
                        .bucket(bucketName)
                        .build()
        ).contents();

        List<String> added = new ArrayList<>();
        List<String> skipped = new ArrayList<>();

        for (S3Object obj : objects) {
            String url = publicUrl + "/" + bucketName + "/" + obj.key();

            boolean exists = Image.count("url", url) > 0;
            if (exists) {
                skipped.add(obj.key());
                continue;
            }

            Image image = new Image();
            image.url = url;
            image.persist();
            added.add(obj.key());
        }

        return Response.ok(
                "{\"added\": " + added.size() +
                ", \"skipped\": " + skipped.size() +
                ", \"addedFiles\": " + toJsonArray(added) +
                ", \"skippedFiles\": " + toJsonArray(skipped) + "}"
        ).build();
    }

    private String toJsonArray(List<String> list) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < list.size(); i++) {
            sb.append("\"").append(list.get(i)).append("\"");
            if (i < list.size() - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }
}
