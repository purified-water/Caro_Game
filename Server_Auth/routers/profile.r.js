const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile.c');

router.get('/', profileController.renderProfile);
router.post('/', profileController.postProfile);
router.get('/edit', profileController.renderUpdateProfile);
router.post('/edit', profileController.postUpdateProfile);


module.exports = router;