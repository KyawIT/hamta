package at.hamta.resource;

import at.hamta.entity.*;
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
import java.util.Set;

@Path("/api/images")
public class ImageUploadResource {

    private static final Set<String> ALLOWED_CATEGORIES = Set.of(
            "starter", "main-course", "dessert", "cocktail", "beverage"
    );

    @Inject
    ImageService imageService;

    /**
     * Lädt ein Bild hoch, speichert es in der image-Tabelle und
     * verknüpft die image_id mit dem jeweiligen Eintrag.
     *
     * POST /api/images/upload/{category}/{id}
     */
    @POST
    @Path("/upload/{category}/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response upload(
            @PathParam("category") String category,
            @PathParam("id") Long id,
            @RestForm("file") FileUpload file) {

        if (!ALLOWED_CATEGORIES.contains(category)) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"Invalid category. Allowed: starter, main-course, dessert, cocktail, beverage\"}")
                    .build();
        }

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

        // Image-Datensatz anlegen
        Image image = new Image();
        image.url = imageUrl;
        image.persist();

        // image_id verknüpfen
        boolean found = linkImage(category, id, image);
        if (!found) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"Entry not found\"}")
                    .build();
        }

        return Response.ok("{\"imageId\": " + image.id + ", \"imageUrl\": \"" + imageUrl + "\"}").build();
    }

    private boolean linkImage(String category, Long id, Image image) {
        return switch (category) {
            case "starter" -> {
                Starter entity = Starter.findById(id);
                if (entity == null) yield false;
                entity.image = image;
                yield true;
            }
            case "main-course" -> {
                MainCourse entity = MainCourse.findById(id);
                if (entity == null) yield false;
                entity.image = image;
                yield true;
            }
            case "dessert" -> {
                Dessert entity = Dessert.findById(id);
                if (entity == null) yield false;
                entity.image = image;
                yield true;
            }
            case "cocktail" -> {
                Cocktail entity = Cocktail.findById(id);
                if (entity == null) yield false;
                entity.image = image;
                yield true;
            }
            case "beverage" -> {
                Beverage entity = Beverage.findById(id);
                if (entity == null) yield false;
                entity.image = image;
                yield true;
            }
            default -> false;
        };
    }
}
