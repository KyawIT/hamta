package at.hamta.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "nachspeise")
public class Nachspeise extends PanacheEntity {

    @Column(nullable = false)
    public String name;

    @Column(name = "image_url")
    public String imageUrl;
}
