const express = require('express');
const router = express.Router();

const gameController = require('../controllers/game.c');

router.get('/', gameController.logout);

module.exports = router
