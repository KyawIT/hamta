package at.hamta.resource;

import at.hamta.entity.Nachspeise;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/nachspeisen")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class NachspeiseResource {

    @GET
    public List<Nachspeise> getAll() {
        return Nachspeise.listAll();
    }

    @GET
    @Path("/{id}")
    public Nachspeise getById(@PathParam("id") Long id) {
        return Nachspeise.findById(id);
    }

    @POST
    @Transactional
    public Response create(Nachspeise nachspeise) {
        nachspeise.persist();
        return Response.status(Response.Status.CREATED).entity(nachspeise).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Nachspeise updated) {
        Nachspeise existing = Nachspeise.findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existing.name = updated.name;
        existing.imageUrl = updated.imageUrl;
        return Response.ok(existing).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Nachspeise.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}
