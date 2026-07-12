package at.hamta.resource;

import at.hamta.entity.Category;
import at.hamta.entity.Drink;
import at.hamta.entity.Image;
import io.quarkus.security.Authenticated;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/drinks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DrinkResource {

    @GET
    public List<Drink> getAll(@QueryParam("categoryId") Long categoryId) {
        if (categoryId != null) {
            return Drink.list("category.id", categoryId);
        }
        return Drink.listAll();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Drink drink = Drink.findById(id);
        return drink != null
                ? Response.ok(drink).build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    @Authenticated
    @Transactional
    public Response create(Drink drink) {
        drink.category = resolveCategory(drink.category);
        drink.image    = resolveImage(drink.image);
        drink.persist();
        return Response.status(Response.Status.CREATED).entity(drink).build();
    }

    @PUT
    @Path("/{id}")
    @Authenticated
    @Transactional
    public Response update(@PathParam("id") Long id, Drink updated) {
        Drink existing = Drink.findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existing.category    = resolveCategory(updated.category);
        existing.name        = updated.name;
        existing.price       = updated.price;
        existing.description = updated.description;
        existing.image       = resolveImage(updated.image);
        return Response.ok(existing).build();
    }

    @DELETE
    @Path("/{id}")
    @Authenticated
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Drink.deleteById(id);
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
