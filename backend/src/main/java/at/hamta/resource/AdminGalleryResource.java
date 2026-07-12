package at.hamta.resource;

import at.hamta.dto.GalleryImageDto;
import at.hamta.dto.GalleryUpdateRequest;
import at.hamta.entity.GalleryImage;
import at.hamta.entity.Image;
import io.quarkus.security.Authenticated;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Path("/api/admin/gallery")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class AdminGalleryResource {

    @GET
    public List<GalleryImageDto> getGallery() {
        List<GalleryImage> entries = GalleryImage.findOrdered();
        List<GalleryImageDto> result = new ArrayList<>();
        for (GalleryImage entry : entries) {
            result.add(new GalleryImageDto(entry.image.id, entry.image.url, entry.position, entry.caption));
        }
        return result;
    }

    @PUT
    @Transactional
    public Response updateGallery(GalleryUpdateRequest request) {
        if (request == null || request.images == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"images must not be null\"}")
                    .build();
        }
        if (request.images.size() > 10) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"Gallery may contain at most 10 slots\"}")
                    .build();
        }

        Set<Long> seen = new HashSet<>();
        for (GalleryUpdateRequest.Entry entry : request.images) {
            if (entry.imageId == null) continue;
            if (!seen.add(entry.imageId)) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Duplicate imageId: " + entry.imageId + "\"}")
                        .build();
            }
        }

        for (GalleryUpdateRequest.Entry entry : request.images) {
            if (entry.imageId == null) continue;
            if (Image.findById(entry.imageId) == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"error\": \"Image not found: " + entry.imageId + "\"}")
                        .build();
            }
        }

        GalleryImage.deleteAll();

        List<GalleryImageDto> result = new ArrayList<>();
        for (int i = 0; i < request.images.size(); i++) {
            GalleryUpdateRequest.Entry entry = request.images.get(i);
            if (entry.imageId == null) continue;
            Image image = Image.findById(entry.imageId);
            GalleryImage galleryImage = new GalleryImage();
            galleryImage.image    = image;
            galleryImage.position = i;
            galleryImage.caption  = entry.caption;
            galleryImage.persist();
            result.add(new GalleryImageDto(image.id, image.url, i, galleryImage.caption));
        }

        return Response.ok(result).build();
    }
}
