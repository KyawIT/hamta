package at.hamta.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "gallery_image")
public class GalleryImage extends PanacheEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "image_id", nullable = false)
    public Image image;

    @Column(nullable = false, unique = true)
    public int position;

    public static List<GalleryImage> findOrdered() {
        return list("ORDER BY position ASC");
    }
}
