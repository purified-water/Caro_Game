const { getByUN } = require('../models/users.m');

async function renderProfile(req, res) {
    const token = req.query.token || "";
    const user = await getByUN(req.query.username);
    console.log('User from token cua profile', user);
    if (user && token != "") {
        res.render("profile", { user });
    } else {
        res.redirect("/");
    }
}

module.exports = {
    renderProfile
}


