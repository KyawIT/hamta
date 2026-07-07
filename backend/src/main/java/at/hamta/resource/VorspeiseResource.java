package at.hamta.resource;

import at.hamta.entity.Vorspeise;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/vorspeisen")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class VorspeiseResource {

    @GET
    public List<Vorspeise> getAll() {
        return Vorspeise.listAll();
    }

    @GET
    @Path("/{id}")
    public Vorspeise getById(@PathParam("id") Long id) {
        return Vorspeise.findById(id);
    }

    @POST
    @Transactional
    public Response create(Vorspeise vorspeise) {
        vorspeise.persist();
        return Response.status(Response.Status.CREATED).entity(vorspeise).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Vorspeise updated) {
        Vorspeise existing = Vorspeise.findById(id);
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
        boolean deleted = Vorspeise.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}
