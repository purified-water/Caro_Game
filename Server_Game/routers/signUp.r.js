const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/signUp.c');

router.get('/', signUpController.render);
router.post('/user', signUpController.signUp);

module.exports = router;