const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile.c');

router.get('/', profileController.renderProfile);

module.exports = router;