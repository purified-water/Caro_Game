const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.c');
// const authenticate = require('../middlewares/authentication')

// router.use(authenticate);
router.get('/', homeController.returnHome);
router.get('/signout', homeController.logout);

module.exports = router
