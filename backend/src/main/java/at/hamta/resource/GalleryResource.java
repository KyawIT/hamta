package at.hamta.resource;

import at.hamta.dto.GalleryImageDto;
import at.hamta.entity.GalleryImage;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.List;

@Path("/api/gallery")
@Produces(MediaType.APPLICATION_JSON)
public class GalleryResource {

    @GET
    public List<GalleryImageDto> getGallery() {
        List<GalleryImage> entries = GalleryImage.findOrdered();
        List<GalleryImageDto> result = new ArrayList<>();
        for (GalleryImage entry : entries) {
            result.add(new GalleryImageDto(entry.image.id, entry.image.url, entry.position, entry.caption));
        }
        return result;
    }
}
