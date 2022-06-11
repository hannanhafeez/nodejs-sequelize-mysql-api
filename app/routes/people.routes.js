module.exports = app => {
    const peopleController = require("../controllers/people.controller.js");

    const router = require("express").Router();

    // Create a new people
    router.post("/", peopleController.create);

    // Retrieve all peoples
    router.get("/", peopleController.findAll);

    // Retrieve all published peoples
    router.get("/published", peopleController.findAllPublished);

    // Retrieve a single people with id
    router.get("/:id", peopleController.findOne);

    // Update a people with id
    router.put("/:id", peopleController.update);

    // Delete a people with id
    router.delete("/:id", peopleController.delete);

    // Delete all peoples
    router.delete("/", peopleController.deleteAll);

    app.use("/api/people", router);
};