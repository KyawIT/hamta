package at.hamta.dto;

public class GalleryImageDto {
    public Long imageId;
    public String url;
    public int position;

    public GalleryImageDto(Long imageId, String url, int position) {
        this.imageId  = imageId;
        this.url      = url;
        this.position = position;
    }
}
