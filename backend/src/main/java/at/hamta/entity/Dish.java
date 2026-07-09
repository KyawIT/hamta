package at.hamta.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "dish")
public class Dish extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "category_id")
    public Category category;

    @Column(nullable = false)
    public String name;

    @Column(precision = 10, scale = 2)
    public BigDecimal price;

    @Column(columnDefinition = "TEXT")
    public String ingredients;

    @ManyToOne
    @JoinColumn(name = "image_id")
    public Image image;

    /** Output: returns category id as plain number */
    public Long getCategoryId() {
        return category != null ? category.id : null;
    }

    /** Input: allows {"categoryId": 5} in POST/PUT body */
    public void setCategoryId(Long id) {
        if (id != null) {
            if (this.category == null) this.category = new Category();
            this.category.id = id;
        }
    }

    /** Output: returns image id as plain number */
    public Long getImageId() {
        return image != null ? image.id : null;
    }

    /** Input: allows {"imageId": 3} in POST/PUT body */
    public void setImageId(Long id) {
        if (id != null) {
            if (this.image == null) this.image = new Image();
            this.image.id = id;
        }
    }
}
