package at.hamta.resource;

import at.hamta.entity.MainCourse;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/main-courses")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MainCourseResource {

    @GET
    public List<MainCourse> getAll() {
        return MainCourse.listAll();
    }

    @GET
    @Path("/{id}")
    public MainCourse getById(@PathParam("id") Long id) {
        return MainCourse.findById(id);
    }

    @POST
    @Transactional
    public Response create(MainCourse mainCourse) {
        mainCourse.persist();
        return Response.status(Response.Status.CREATED).entity(mainCourse).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, MainCourse updated) {
        MainCourse existing = MainCourse.findById(id);
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
        boolean deleted = MainCourse.deleteById(id);
        return deleted
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}
