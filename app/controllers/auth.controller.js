const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Op;

exports.signup = async(req, res) => {
    // Save user to database
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data  can not be empty!"
        });
    }
    if (!req.body.username) {
        return res.status(400).send({
            message: "Note username can not be empty"
        });
    }
    if (!req.body.email) {
        return res.status(400).send({
            message: "Note email can not be empty"
        });
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "Note username can not be empty"
        });
    }

    User.create({

            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            email: req.body.email,
            company: req.body.company,
            password: await (bcrypt.hashSync(req.body.password, 8))
        })
        .then(user => {
            console.log(user);
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        id: {
                            [Op.or]: [req.body.roles]
                        }
                    }
                }).then(roles => {
                    console.log(roles);
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // User role 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            console.log("user", user);
            if (!user) {
                return res.status(400).send({
                    message: "Email Not found"
                });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(400).send({
                    message: "Invalid Password"
                });
            }

            let token = jwt.sign({ id: user.id }, config.auth.secret, {
                expiresIn: 86400 // 24 hours
            });

            let authorities = "";
            user.getRoles().then(roles => {
                console.log("shell", roles);
                for (let i = 0; i < roles.length; i++) {
                    //    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                    authorities = roles[i].name;
                }

                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phonenumber: user.phonenumber,
                    email: user.email,
                    company: user.company,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};