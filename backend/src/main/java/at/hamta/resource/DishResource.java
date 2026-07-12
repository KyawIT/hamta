package at.hamta.resource;

import at.hamta.entity.Category;
import at.hamta.entity.Dish;
import at.hamta.entity.Image;
import io.quarkus.security.Authenticated;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/dishes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DishResource {

    @GET
    public List<Dish> getAll(@QueryParam("categoryId") Long categoryId) {
        if (categoryId != null) {
            return Dish.list("category.id", categoryId);
        }
        return Dish.listAll();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Dish dish = Dish.findById(id);
        return dish != null
                ? Response.ok(dish).build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    @Authenticated
    @Transactional
    public Response create(Dish dish) {
        dish.category = resolveCategory(dish.category);
        dish.image    = resolveImage(dish.image);
        dish.persist();
        return Response.status(Response.Status.CREATED).entity(dish).build();
    }

    @PUT
    @Path("/{id}")
    @Authenticated
    @Transactional
    public Response update(@PathParam("id") Long id, Dish updated) {
        Dish existing = Dish.findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existing.category    = resolveCategory(updated.category);
        existing.name        = updated.name;
        existing.price       = updated.price;
        existing.ingredients = updated.ingredients;
        existing.image       = resolveImage(updated.image);
        return Response.ok(existing).build();
    }

    @DELETE
    @Path("/{id}")
    @Authenticated
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Dish.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }

    private Category resolveCategory(Category cat) {
        if (cat == null || cat.id == null) return null;
        return Category.findById(cat.id);
    }

    private Image resolveImage(Image img) {
        if (img == null || img.id == null) return null;
        return Image.findById(img.id);
    }
}
