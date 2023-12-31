const express = require('express');
const router = express.Router();
// const accController = require('../controllers/users.c');
// const passport = require('passport')

const getUserController = require('../controllers/getUser.c');

router.post('/', getUserController.getUserByToken);


module.exports = router;