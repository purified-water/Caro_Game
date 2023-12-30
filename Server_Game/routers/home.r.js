const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.c');
// const authenticate = require('../middlewares/authentication')

router.get('/signout', homeController.logout);

module.exports = router
