package at.hamta.resource;

import at.hamta.entity.Starter;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/starters")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StarterResource {

    @GET
    public List<Starter> getAll() {
        return Starter.listAll();
    }

    @GET
    @Path("/{id}")
    public Starter getById(@PathParam("id") Long id) {
        return Starter.findById(id);
    }

    @POST
    @Transactional
    public Response create(Starter starter) {
        starter.persist();
        return Response.status(Response.Status.CREATED).entity(starter).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Starter updated) {
        Starter existing = Starter.findById(id);
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
        boolean deleted = Starter.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}
