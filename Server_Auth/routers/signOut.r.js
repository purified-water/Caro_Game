const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.c');

router.get('/', homeController.logout);

module.exports = router
