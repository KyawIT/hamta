package at.hamta.resource;

import at.hamta.entity.Image;
import at.hamta.service.ImageService;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Path("/api/images")
@Produces(MediaType.APPLICATION_JSON)
public class ImageUploadResource {

    @Inject
    ImageService imageService;

    /**
     * Returns all images (id + url).
     * GET /api/images
     */
    @GET
    public List<Image> getAll() {
        return Image.listAll();
    }

    /**
     * Returns a single image by id (id + url).
     * GET /api/images/{id}
     */
    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Image image = Image.findById(id);
        return image != null
                ? Response.ok(image).build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }

    /**
     * Uploads an image to MinIO, resizes to max 1200px, converts to WebP,
     * saves the public URL in the image table and returns id + url.
     *
     * POST /api/images/upload
     * Form field: "file" (image file)
     *
     * Response: { "id": 1, "url": "http://minio-host/bucket/category/uuid.webp" }
     */
    @POST
    @Path("/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Response upload(
            @QueryParam("category") @DefaultValue("general") String category,
            @RestForm("file") FileUpload file) {

        if (file == null || file.size() == 0) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"No file provided\"}")
                    .build();
        }

        String imageUrl;
        try {
            imageUrl = imageService.uploadImage(
                    Files.newInputStream(file.uploadedFile()),
                    category
            );
        } catch (IOException e) {
            return Response.serverError()
                    .entity("{\"error\": \"Error reading file: " + e.getMessage() + "\"}")
                    .build();
        } catch (Exception e) {
            return Response.serverError()
                    .entity("{\"error\": \"Error processing image: " + e.getMessage() + "\"}")
                    .build();
        }

        Image image = new Image();
        image.url = imageUrl;
        image.persist();

        return Response.status(Response.Status.CREATED).entity(image).build();
    }
}
