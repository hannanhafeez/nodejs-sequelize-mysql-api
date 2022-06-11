const db = require("../models");
const Project = db.project;
const Op = db.Op;

// Create and Save a new Book
exports.create = (req, res) => {

    const alertuser1 = req.body.alert_user.toString()
    console.log(alertuser1);
    // Validate request
    if (!req.body.project_name) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "project_name can not be empty!"
        });
        return;
    }
    if (!req.body.address) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "address can not be empty!"
        });
        return;
    }
    if (!req.body.lat) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "lat can not be empty!"
        });
        return;
    }
    if (!req.body.lng) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "lng can not be empty!"
        });
        return;
    }



    // Create a Book
    const project = {
        project_name: req.body.project_name,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        alert_user: alertuser1

    };
    console.log(project);

    // Save Book in database
    Project.create(project)
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

    Project.findAll({ where: condition })
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
    const id = req.params.id;

    Project.findByPk(id)
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
    const alertuser1 = req.body.alert_user.toString()
    const project = {
        project_name: req.body.project_name,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        alert_user: alertuser1

    };
    Project.update(project, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    error: 0,
                    success: 1,
                    message: "project was updated successfully."
                });
            } else {
                res.send({
                    error: 1,
                    success: 0,
                    message: `Cannot update project with id=${id}. Maybe Book was not found or req.body is empty!`
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

    Project.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    error: 0,
                    success: 1,
                    message: "project was deleted successfully!"
                });
            } else {
                res.send({
                    error: 1,
                    success: 0,
                    message: `Cannot delete project with id=${id}. Maybe Book was not found!`
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
    Project.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} project were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all project."
            });
        });
};

// Find all published Books
exports.findAllPublished = (req, res) => {
    Book.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
};