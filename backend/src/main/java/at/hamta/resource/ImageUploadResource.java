package at.hamta.resource;

import at.hamta.entity.Hauptspeise;
import at.hamta.entity.Nachspeise;
import at.hamta.entity.Vorspeise;
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
            "vorspeise", "hauptspeise", "nachspeise"
    );

    @Inject
    ImageService imageService;

    /**
     * Lädt ein Bild für ein Gericht hoch.
     *
     * POST /api/images/upload/{category}/{gerichtId}
     *
     * Multipart-Form:
     *   file  - Das Bild (JPEG, PNG, WebP, ...)
     *
     * Speichert das konvertierte WebP in MinIO und schreibt
     * die URL in die image_url-Spalte des Gerichts.
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
                    .entity("{\"error\": \"Ungültige Kategorie. Erlaubt: vorspeise, hauptspeise, nachspeise\"}")
                    .build();
        }

        if (file == null || file.size() == 0) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"Keine Datei übermittelt\"}")
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
                    .entity("{\"error\": \"Fehler beim Lesen der Datei: " + e.getMessage() + "\"}")
                    .build();
        } catch (Exception e) {
            return Response.serverError()
                    .entity("{\"error\": \"Fehler beim Verarbeiten des Bildes: " + e.getMessage() + "\"}")
                    .build();
        }

        // image_url in der entsprechenden Tabelle aktualisieren
        String updatedUrl = setImageUrl(category, id, imageUrl);
        if (updatedUrl == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"Gericht nicht gefunden\"}")
                    .build();
        }

        return Response.ok("{\"imageUrl\": \"" + imageUrl + "\"}").build();
    }

    private String setImageUrl(String category, Long id, String imageUrl) {
        return switch (category) {
            case "vorspeise" -> {
                Vorspeise entity = Vorspeise.findById(id);
                if (entity == null) yield null;
                entity.imageUrl = imageUrl;
                yield imageUrl;
            }
            case "hauptspeise" -> {
                Hauptspeise entity = Hauptspeise.findById(id);
                if (entity == null) yield null;
                entity.imageUrl = imageUrl;
                yield imageUrl;
            }
            case "nachspeise" -> {
                Nachspeise entity = Nachspeise.findById(id);
                if (entity == null) yield null;
                entity.imageUrl = imageUrl;
                yield imageUrl;
            }
            default -> null;
        };
    }
}
