const db = require("../models");
const People = db.people;
const Op = db.Op;

// Create and Save a new Book
exports.create = (req, res) => {
    console.log(req.body);
    // Validate request
    if (!req.body.firstname) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "firstname can not be empty!"
        });
        return;
    }
    if (!req.body.lastname) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "lastname can not be empty!"
        });
        return;
    }
    if (!req.body.mobileno) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "mobileno can not be empty!"
        });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({
            error: 1,
            success: 0,
            message: "email can not be empty!"
        });
        return;
    }


    // Create a Book
    const people = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobileno: req.body.mobileno,

    };
    console.log("mytest", people);

    // Save Book in database
    People.create(people)
        .then(data => {

            const firstname = data.firstname.replace(/\s+/g, '');
            const lastname = data.lastname.replace(/\s+/g, '');
            const username = firstname + lastname + data.id;
            const uname = {
                username: username
            }
            People.update(uname, {
                where: { id: data.id }
            }).then(num => {

                res.send({
                    error: 0,
                    success: 1,
                    message: "data has been added successfully!"
                });
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

    People.findAll({ where: condition })
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
                message: err.message || "Some error accurred while retrieving People."
            });
        });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    People.findByPk(id)
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

    People.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    error: 0,
                    success: 1,
                    message: "People was updated successfully."
                });
            } else {
                res.send({
                    error: 1,
                    success: 0,
                    message: `Cannot update People with id=${id}. Maybe Book was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                error: 1,
                success: 0,
                message: "Error updating People with id=" + id
            });
        });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    People.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    error: 0,
                    success: 1,
                    message: "People was deleted successfully!"
                });
            } else {
                res.send({
                    error: 1,
                    success: 0,
                    message: `Cannot delete People with id=${id}. Maybe Book was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                error: 1,
                success: 0,
                message: "Could not delete People with id=" + id
            });
        });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
    People.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} People were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all People."
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