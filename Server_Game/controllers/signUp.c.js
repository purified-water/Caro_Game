const userModel = require('../models/users.m');
const bcrypt = require('bcrypt');
const salt = 10;

module.exports = {
    render: async(req, res, next) => {
        try {
            res.render('signUp');
        } catch (error) {
            console.log(error);
        }
    },
    signUp: async(req, res, next) => {
        try {
            const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
            await userModel.add(req.body.username, encryptedPassword, req.body.name, req.body.email, req.body.dob, 1);
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }
}