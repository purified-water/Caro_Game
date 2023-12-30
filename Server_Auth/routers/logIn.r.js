const express = require('express');
const router = express.Router();
// const accController = require('../controllers/users.c');
// const passport = require('passport')

const loginController = require('../controllers/logIn.c')

router.post('/', loginController.logIn);


module.exports = router;