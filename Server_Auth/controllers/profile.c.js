const { getByUN } = require('../models/users.m');

async function renderProfile(req, res) {
    const token = req.cookies.accessToken || "";
    console.log('query', req.query);
    console.log('body', req.body);
    console.log('cookie', req.cookies);
    const user = await getByUN(req.cookies.username);
    console.log('User from token cua profile', user);
    if (user && token != "") {
        res.render("profile", { user });
    } else {
        res.redirect("/");
    }
}
// Chưa có check token
// Tính sau
// TO DO: Check token
async function postProfile(req, res) {
    console.log('body post', req.body);
    const token = req.body.accessToken || "";
    const username = await getByUN(req.body.username);
    console.log('User from token cua profile post', username);
    if (username && token != "") {
        res.redirect(`/profile`);
    } else {
        res.redirect("/");
    }
}
module.exports = {
    renderProfile,
    postProfile
}


