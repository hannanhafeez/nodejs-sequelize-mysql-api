const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["Authorization"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.auth.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        req.userId = decoded.id;
        console.log("myid", req.userId);

        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        //  console.log("user", user);
        user.getRoles().then(roles => {
            console.log(roles.length);
            console.log(roles);

            for (let i = 0; i < roles.length; i++) {
                console.log(roles[i].name);
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator Role!"
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;