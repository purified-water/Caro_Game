const { getByUN } = require('../models/users.m');
const userModel = require('../models/users.m');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function renderProfile(req, res) {
    const accessToken = req.cookies.accessToken || "";
    // console.log('query', req.query);
    // console.log('body', req.body);
    // console.log('cookie', req.cookies);
    const user = await getByUN(req.cookies.username);
    // console.log('User from accessToken cua profile', user);
    if (user && accessToken != "") {
        res.render("profile", { user });
    } else {
        res.redirect("/");
    }
}
// Chưa có check accessToken
// Tính sau
// TO DO: Check accessToken
async function postProfile(req, res) {
    // console.log('body post', req.body);
    const accessToken = req.body.accessToken || "";
    const username = await getByUN(req.body.username);
    // console.log('User from accessToken cua profile post', username);
    if (username && accessToken != "") {
        res.redirect(`/profile`);
    } else {
        res.redirect("/");
    }
}
async function renderUpdateProfile(req, res) {
    const accessToken = req.cookies.accessToken || "";
    
    const user = await getByUN(req.cookies.username);
    // console.log('User from accessToken cua profile', user);
    if (user) {
        res.render("updateProfile", { user });
    } else {
        console.log('Error in renderUpdateProfile');
        res.redirect("/");
    }
}


async function postUpdateProfile(req, res) {
    // console.log('body post', req.body);
    const accessToken = req.body.accessToken || "";
    // console.log('Post update profile body', req.body);
    const { username, fullname, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, saltRounds);


    if (username) {
        await userModel.update(username, fullname, encryptedPassword);
        res.redirect(`/profile`);
    } else {
        console.log('Error in postUpdateProfile');
        res.redirect("/");
    }
}
module.exports = {
    renderProfile,
    postProfile,
    renderUpdateProfile,
    postUpdateProfile
}


