module.exports.authorize = function (req, res, next) {
    if (req.cookies.accessToken || req.isAuthenticated()) {
        // console.log('Sessions in authenticate: ', req.session);
        // console.log('Cookies in authenticate: ', req.cookies);
        next();
    } else {
        // console.log('Sessions in authenticate: ', req.session);
        // console.log('Cookies in authenticate: ', req.cookies);
        // console.log('Query in authenticate: ', req.query);
        // console.log("You're not authorized!");
        res.redirect("/logIn");
    }
};