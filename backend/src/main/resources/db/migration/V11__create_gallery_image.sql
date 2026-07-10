CREATE TABLE gallery_image (
    id       BIGSERIAL PRIMARY KEY,
    image_id BIGINT NOT NULL UNIQUE REFERENCES image(id) ON DELETE CASCADE,
    position INT    NOT NULL UNIQUE,
    caption  VARCHAR(500)
);
