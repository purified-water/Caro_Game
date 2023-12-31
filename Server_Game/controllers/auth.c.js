const passport = require("passport");

module.exports = {
    renderLogIn: async (req, res) => {
        console.log('Rendering logIn page');
        res.render("logIn");
    },
    authorizeToken: (req, res) => {
        passport.authenticate("my-strategy", {
            successRedirect: "/",
            failureRedirect: "/logIn",
        }),
            (req, res) => {
                res.redirect("/logIn");
            };
    }

}