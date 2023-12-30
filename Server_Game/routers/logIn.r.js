const express = require('express');
const router = express.Router();
// const accController = require('../controllers/users.c');
const passport = require('passport')

const loginController = require('../controllers/logIn.c');

// router.post('/', loginController.logIn);
// router.post('/', passport.authenticate('myStrategy', (req, res) => {
//     console.log("REQ", req);
//     console.log(res);
//     return res.redirect('/categories');
// }))
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/categories/google',
    failureRedirect: '/'
    }
));
router.post('/', (req, res, next) => {
    passport.authenticate('myStrategy', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            // Authentication failed
            // Handle it as needed (e.g., show an error message)
            return res.status(401).send('Authentication failed');
        }

        // Authentication successful, log the user in
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            // Redirect to the desired location (e.g., '/categories')
            return res.redirect('/categories');
        });
    })(req, res, next);
});

module.exports = router;