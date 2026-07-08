package at.hamta.resource;

import at.hamta.entity.Beverage;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/beverages")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BeverageResource {

    @GET
    public List<Beverage> getAll() {
        return Beverage.listAll();
    }

    @GET
    @Path("/{id}")
    public Beverage getById(@PathParam("id") Long id) {
        return Beverage.findById(id);
    }

    @POST
    @Transactional
    public Response create(Beverage beverage) {
        beverage.persist();
        return Response.status(Response.Status.CREATED).entity(beverage).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Beverage updated) {
        Beverage existing = Beverage.findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existing.name = updated.name;
        existing.image = updated.image;
        existing.preis = updated.preis;
        return Response.ok(existing).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Beverage.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}
