const express = require('express');
const router = express.Router();

const requestController = require('../controllers/request.c');

router.get('/', requestController.renderRequest);
router.post('/', requestController.postRequest);

module.exports = router;