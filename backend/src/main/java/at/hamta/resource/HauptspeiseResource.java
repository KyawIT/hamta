package at.hamta.resource;

import at.hamta.entity.Hauptspeise;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/hauptspeisen")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class HauptspeiseResource {

    @GET
    public List<Hauptspeise> getAll() {
        return Hauptspeise.listAll();
    }

    @GET
    @Path("/{id}")
    public Hauptspeise getById(@PathParam("id") Long id) {
        return Hauptspeise.findById(id);
    }

    @POST
    @Transactional
    public Response create(Hauptspeise hauptspeise) {
        hauptspeise.persist();
        return Response.status(Response.Status.CREATED).entity(hauptspeise).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Hauptspeise updated) {
        Hauptspeise existing = Hauptspeise.findById(id);
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
        boolean deleted = Hauptspeise.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}
