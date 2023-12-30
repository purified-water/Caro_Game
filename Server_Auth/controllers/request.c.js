const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../models/users.m');

function renderRequest(req, res, next) {

    const username = req.query.username;
    const fullname = req.query.fullname;
    res.render("request", { username, fullname });
}
function postRequest(req, res, next) {
    // Tạo token với maxage
    const payload = {
        username: req.body.username,
        fullname: req.body.fullname
    }
    console.log('Fullname in req c', req.body);
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: req.body.maxage });
    console.log('req c token', token);
    // Lưu token vào cookie
    res.cookie('accessToken', token);
    res.cookie('username', req.body.username);
    res.cookie('fullname', req.body.fullname);
    res.redirect(`${process.env.GAME_URL}/`);
}

module.exports = {
    renderRequest,
    postRequest
}