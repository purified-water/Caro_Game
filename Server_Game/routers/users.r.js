const express = require('express');
const router = express.Router();
const accController = require('../controllers/users.c');
const passport = require('passport')

router.post('/signup', accController.add);

router.post('/login', passport.authenticate('myStrategy', {
    failureRedirect: '/'
}, (req, res) => {
    res.redirect('/categories');
}))


module.exports = router;

