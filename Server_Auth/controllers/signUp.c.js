const userModel = require('../models/users.m');
const bcrypt = require('bcrypt');
const salt = 10;

module.exports = {
    render: async(req, res, next) => {
        try {
            res.render('signUp');
        } catch (error) {
            // console.log(error);
        }
    },
    signUp: async (req, res, next) => {
        try {
            // console.log('New user: ', req.body);
            const user = await userModel.getByUN(req.body.username);
            if (user && req.body.username === user.username) {
                res.status(400).json({ message: 'Username already exists' });
            } else {
                const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
                await userModel.add(req.body.username, req.body.fullname, encryptedPassword, '../public/images/default-avatar.png');
                res.redirect('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
}