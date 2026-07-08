package at.hamta.resource;

import at.hamta.entity.Dessert;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/desserts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DessertResource {

    @GET
    public List<Dessert> getAll() {
        return Dessert.listAll();
    }

    @GET
    @Path("/{id}")
    public Dessert getById(@PathParam("id") Long id) {
        return Dessert.findById(id);
    }

    @POST
    @Transactional
    public Response create(Dessert dessert) {
        dessert.persist();
        return Response.status(Response.Status.CREATED).entity(dessert).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Dessert updated) {
        Dessert existing = Dessert.findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existing.name = updated.name;
        existing.image = updated.image;
        existing.zutaten = updated.zutaten;
        existing.preis = updated.preis;
        return Response.ok(existing).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Dessert.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}
