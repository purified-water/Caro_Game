const express = require('express');
const router = express.Router();
const accController = require('../controllers/users.c');
const passport = require('passport')

router.post('/signup', accController.add);
// router.post('/login', accController.login);

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/categories/google',
    failureRedirect: '/'
    }
));

router.post('/login', passport.authenticate('myStrategy', {
    failureRedirect: '/'
}, (req, res) => {
    res.redirect('/categories');
}))


module.exports = router;

