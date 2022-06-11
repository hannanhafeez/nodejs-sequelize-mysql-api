module.exports = app => {
    const sensorvalueController = require("../controllers/sensordata.controller.js");

    const router = require("express").Router();

    // Create a new Book
    router.post("/", sensorvalueController.create);

    // Retrieve all Books
    router.get("/", sensorvalueController.findAll);

    // Retrieve all published Books
    router.get("/published", sensorvalueController.findAllPublished);

    // Retrieve a single Book with id
    router.get("/:id", sensorvalueController.findOne);

    // Update a Book with id
    router.put("/:id", sensorvalueController.update);

    // Delete a Book with id
    router.delete("/:id", sensorvalueController.delete);

    // Delete all Books
    router.delete("/", sensorvalueController.deleteAll);

    app.use("/api/sensordata", router);
};