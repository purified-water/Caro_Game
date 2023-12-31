const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../models/users.m');

function renderRequest(req, res, next) {

    const username = req.query.username;
    const fullname = req.query.fullname;
    res.render("request", { username, fullname });
}
function postRequest(req, res, next) {
    // Tạo accessToken với maxage
    const user = {
        username: req.body.username,
        fullname: req.body.fullname,
        url: `http://localhost:21588/authorize`,
    }
    console.log('Fullname in req c', req.body);
    const accessToken = jwt.sign(user, process.env.SECRET, { expiresIn: req.body.maxage });
    console.log('req c accessToken', accessToken);
    // Lưu accessToken vào cookie
    res.cookie('accessToken', accessToken);
    res.cookie('username', req.body.username);
    res.cookie('fullname', req.body.fullname);
    res.redirect(`${user.url}?accessToken=${accessToken}`);
}

module.exports = {
    renderRequest,
    postRequest
}