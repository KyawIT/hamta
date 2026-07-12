package at.hamta.resource;

import at.hamta.entity.Category;
import io.quarkus.security.Authenticated;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/categories")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CategoryResource {

    @GET
    public List<Category> getAll() {
        return Category.listAll();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Category category = Category.findById(id);
        return category != null
                ? Response.ok(category).build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    @Authenticated
    @Transactional
    public Response create(Category category) {
        category.persist();
        return Response.status(Response.Status.CREATED).entity(category).build();
    }

    @PUT
    @Path("/{id}")
    @Authenticated
    @Transactional
    public Response update(@PathParam("id") Long id, Category updated) {
        Category existing = Category.findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existing.name = updated.name;
        return Response.ok(existing).build();
    }

    @DELETE
    @Path("/{id}")
    @Authenticated
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Category.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}
