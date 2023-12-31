const express = require('express');
const router = express.Router();


const authController = require("../controllers/auth.c");
const passport = require("passport");

module.exports = function () {
    router.get("/logIn", authController.renderLogIn);
    router.get(
        "/authorize",
        passport.authenticate("my-strategy", {
            successRedirect: "/",
            failureRedirect: "/logIn",
        }),
        (req, res) => {
            res.redirect("/logIn");
        }
    );
    return router;
};
