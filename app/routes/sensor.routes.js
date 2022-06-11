module.exports = app => {
    const sensorController = require("../controllers/sensor.controller.js");

    const router = require("express").Router();

    // Create a new people
    router.post("/", sensorController.create);

    // Retrieve all peoples
    router.get("/", sensorController.findAll);

    // Retrieve all published peoples
    router.get("/published", sensorController.findAllPublished);

    // Retrieve a single people with id
    router.get("/:id", sensorController.findOne);

    // Update a people with id
    router.put("/:id", sensorController.update);

    // Delete a people with id
    router.delete("/:id", sensorController.delete);

    // Delete all peoples
    router.delete("/", sensorController.deleteAll);

    app.use("/api/sensor", router);
};