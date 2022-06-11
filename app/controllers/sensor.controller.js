const db = require("../models");
const Sensor = db.sensor;
const Op = db.Op;

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.sensor_name) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "sensor_name can not be empty!"
        });
        return;
    }
    if (!req.body.project_id) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "project_id can not be empty!"
        });
        return;
    }
    if (!req.body.upperthreashold) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "upperthreashold can not be empty!"
        });
        return;
    }
    if (!req.body.lowerthreashhold) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "lowerthreashhold can not be empty!"
        });
        return;
    }



    // Create a Book
    const sensor = {
        project_id: req.body.project_id,
        sensor_name: req.body.sensor_name,
        upperthreashold: req.body.upperthreashold,
        lowerthreashhold: req.body.lowerthreashhold,

    };
    console.log(sensor);

    // Save Book in database
    Sensor.create(sensor)
        .then(data => {
            res.send({
                error: 0,
                success: 1,
                message: "data has been added successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                error: 1,
                success: 0,
                message: err.message || "Some error occurred while creating the Book."
            });
        });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {

    const username = req.query.username;
    var condition = username ? {
        username: {
            [Op.like]: `%${username}%`
        }
    } : null;

    Sensor.findAll({ where: condition })
        .then(data => {
            l = {
                error: 0,
                success: 1,
                data: data
            }

            res.send(l);
        })
        .catch(err => {
            res.send(500).send({
                error: 1,
                success: 0,
                message: err.message || "Some error accurred while retrieving project."
            });
        });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
    const sensor_id = req.params.id;

    Sensor.findByPk(sensor_id)
        .then(data => {
            l = {
                error: 0,
                success: 1,
                data: data
            }

            res.send(l);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Book with id = ${id}`
            });
        });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const sensor = {
        project_id: req.body.project_id,
        sensor_name: req.body.sensor_name,
        upperthreashold: req.body.upperthreashold,
        lowerthreashhold: req.body.lowerthreashhold,

    };
    Sensor.update(sensor, {
            where: { sensor_id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    error: 0,
                    success: 1,
                    message: "Sensor was updated successfully."
                });
            } else {
                res.send({
                    error: 1,
                    success: 0,
                    message: `Cannot update Sensor with id=${id}. Maybe Book was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                error: 1,
                success: 0,
                message: "Error updating project with id=" + id
            });
        });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Sensor.destroy({
            where: { sensor_id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    error: 0,
                    success: 1,
                    message: "Sensor was deleted successfully!"
                });
            } else {
                res.send({
                    error: 1,
                    success: 0,
                    message: `Cannot delete Sensor with id=${id}. Maybe Book was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                error: 1,
                success: 0,
                message: "Could not delete project with id=" + id
            });
        });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
    Sensor.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Sensor were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all project."
            });
        });
};

// Find all published Books
exports.findAllPublished = (req, res) => {
    Sensor.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
};