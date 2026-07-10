package at.hamta.dto;

import java.util.List;

public class GalleryUpdateRequest {
    public List<Entry> images;

    public static class Entry {
        public Long imageId;
        public String caption;
    }
}
