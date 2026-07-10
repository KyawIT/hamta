package at.hamta.resource;

import at.hamta.dto.GalleryImageDto;
import at.hamta.dto.GalleryUpdateRequest;
import at.hamta.entity.GalleryImage;
import at.hamta.entity.Image;
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
public class AdminGalleryResource {

    @GET
    public List<GalleryImageDto> getGallery() {
        List<GalleryImage> entries = GalleryImage.findOrdered();
        List<GalleryImageDto> result = new ArrayList<>();
        for (GalleryImage entry : entries) {
            result.add(new GalleryImageDto(entry.image.id, entry.image.url, entry.position));
        }
        return result;
    }

    @PUT
    @Transactional
    public Response updateGallery(GalleryUpdateRequest request) {
        if (request == null || request.imageIds == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"imageIds must not be null\"}")
                    .build();
        }
        if (request.imageIds.size() > 10) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"Gallery may contain at most 10 slots\"}")
                    .build();
        }

        Set<Long> seen = new HashSet<>();
        for (Long id : request.imageIds) {
            if (id == null) continue;
            if (!seen.add(id)) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Duplicate imageId: " + id + "\"}")
                        .build();
            }
        }

        for (Long id : request.imageIds) {
            if (id == null) continue;
            if (Image.findById(id) == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"error\": \"Image not found: " + id + "\"}")
                        .build();
            }
        }

        GalleryImage.deleteAll();

        List<GalleryImageDto> result = new ArrayList<>();
        for (int i = 0; i < request.imageIds.size(); i++) {
            Long id = request.imageIds.get(i);
            if (id == null) continue;
            Image image = Image.findById(id);
            GalleryImage entry = new GalleryImage();
            entry.image    = image;
            entry.position = i;
            entry.persist();
            result.add(new GalleryImageDto(image.id, image.url, i));
        }

        return Response.ok(result).build();
    }
}
