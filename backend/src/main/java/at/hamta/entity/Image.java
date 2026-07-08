package at.hamta.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "image")
public class Image extends PanacheEntity {

    @Column(nullable = false)
    public String url;
}
