package at.hamta.resource;

import at.hamta.entity.Cocktail;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/cocktails")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CocktailResource {

    @GET
    public List<Cocktail> getAll() {
        return Cocktail.listAll();
    }

    @GET
    @Path("/{id}")
    public Cocktail getById(@PathParam("id") Long id) {
        return Cocktail.findById(id);
    }

    @POST
    @Transactional
    public Response create(Cocktail cocktail) {
        cocktail.persist();
        return Response.status(Response.Status.CREATED).entity(cocktail).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Cocktail updated) {
        Cocktail existing = Cocktail.findById(id);
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
        boolean deleted = Cocktail.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}
