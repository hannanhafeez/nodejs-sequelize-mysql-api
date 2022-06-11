module.exports = app => {
    const projectController = require("../controllers/project.controller.js");

    const router = require("express").Router();

    // Create a new people
    router.post("/", projectController.create);

    // Retrieve all peoples
    router.get("/", projectController.findAll);

    // Retrieve all published peoples
    router.get("/published", projectController.findAllPublished);

    // Retrieve a single people with id
    router.get("/:id", projectController.findOne);

    // Update a people with id
    router.put("/:id", projectController.update);

    // Delete a people with id
    router.delete("/:id", projectController.delete);

    // Delete all peoples
    router.delete("/", projectController.deleteAll);

    app.use("/api/project", router);
};