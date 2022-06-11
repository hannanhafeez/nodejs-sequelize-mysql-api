const myemail = require('../service/Emailsetting.js');
const db = require("../models");
const SensorValue = db.sensorvalue;

const Op = db.Op;


// Create and Save a new Book
exports.create = (req, res) => {
    myemail.sendMail({
            from: 'ebmacs@zohomail.com',
            to: 'adarvaish0@gmail.com',
            subject: 'Test Email Subject',
            html: '<h1>Example HTML Message Body</h1>'
        }).then(data => {
            console.log("mail sent" + data);
        })
        // Validate request
    if (!req.body.sensor_id) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "sensor id can not be empty!"
        });
        return;
    }
    if (!req.body.sensorvalue) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "sensor value can not be empty!"
        });
        return;
    }


    // Create a Book
    const sensorvalue = {
        sensor_id: req.body.sensor_id,
        sensorvalue: req.body.sensorvalue,

    };
    console.log(sensorvalue);

    // Save Book in database
    SensorValue.create(sensorvalue)
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

    const sensor_id = req.query.sensor_id;
    var condition = sensor_id ? {
        username: {
            [Op.like]: `%${sensor_id}%`
        }
    } : null;

    SensorValue.findAll({ where: condition })
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

    SensorValue.findByPk(sensor_id)
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

    const sensorvalue = {
        sensor_id: req.body.sensor_id,
        sensorvalue: req.body.sensorvalue,

    };

    SensorValue.update(sensorvalue, {
            where: { sensorvalue_id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    error: 0,
                    success: 1,
                    message: "Sensor value was updated successfully."
                });
            } else {
                res.send({
                    error: 1,
                    success: 0,
                    message: `Cannot update Sensor value with id=${id}. Maybe Book was not found or req.body is empty!`
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

    SensorValue.destroy({
            where: { sensorvalue_id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    error: 0,
                    success: 1,
                    message: "Sensor value was deleted successfully!"
                });
            } else {
                res.send({
                    error: 1,
                    success: 0,
                    message: `Cannot delete Sensor value with id=${id}. Maybe Book was not found!`
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
    SensorValue.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} SensorValue were deleted successfully!` });
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