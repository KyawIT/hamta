package at.hamta.resource;

import io.quarkus.security.Authenticated;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ResourceSecurityTest {

    @Test
    void administrativeResourcesRequireAuthentication() {
        assertAuthenticated(AdminGalleryResource.class);
        assertAuthenticated(ImageUploadResource.class);
        assertAuthenticated(ImageSyncResource.class);
    }

    @Test
    void menuMutationsRequireAuthentication() throws NoSuchMethodException {
        assertAuthenticated(DishResource.class.getMethod("create", at.hamta.entity.Dish.class));
        assertAuthenticated(DishResource.class.getMethod("update", Long.class, at.hamta.entity.Dish.class));
        assertAuthenticated(DishResource.class.getMethod("delete", Long.class));

        assertAuthenticated(DrinkResource.class.getMethod("create", at.hamta.entity.Drink.class));
        assertAuthenticated(DrinkResource.class.getMethod("update", Long.class, at.hamta.entity.Drink.class));
        assertAuthenticated(DrinkResource.class.getMethod("delete", Long.class));

        assertAuthenticated(CategoryResource.class.getMethod("create", at.hamta.entity.Category.class));
        assertAuthenticated(CategoryResource.class.getMethod("update", Long.class, at.hamta.entity.Category.class));
        assertAuthenticated(CategoryResource.class.getMethod("delete", Long.class));
    }

    @Test
    void publicResourcesRemainAnonymous() throws NoSuchMethodException {
        assertFalse(GalleryResource.class.isAnnotationPresent(Authenticated.class));
        assertFalse(DishResource.class.getMethod("getAll", Long.class)
                .isAnnotationPresent(Authenticated.class));
        assertFalse(DrinkResource.class.getMethod("getAll", Long.class)
                .isAnnotationPresent(Authenticated.class));
        assertFalse(CategoryResource.class.getMethod("getAll")
                .isAnnotationPresent(Authenticated.class));
    }

    private static void assertAuthenticated(Class<?> resourceClass) {
        assertTrue(resourceClass.isAnnotationPresent(Authenticated.class),
                () -> resourceClass.getSimpleName() + " must require authentication");
    }

    private static void assertAuthenticated(Method method) {
        assertTrue(method.isAnnotationPresent(Authenticated.class),
                () -> method.getDeclaringClass().getSimpleName() + "." + method.getName()
                        + " must require authentication");
    }
}
