const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../models/users.m');

function renderRequest(req, res, next) {

    const username = req.query.username;
    res.render("request", { username });
}
function postRequest(req, res, next) {
    // Tạo token với maxage
    const token = jwt.sign({ username: req.body.username }, process.env.SECRET, { expiresIn: req.body.maxage });
    console.log('req c token', token);
    res.redirect(`/profile?username=${req.body.username}&token=${token}`);
}

module.exports = {
    renderRequest,
    postRequest
}