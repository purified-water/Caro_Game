const express = require('express');
const router = express.Router();

const gameController = require('../controllers/game.c');
// const authenticate = require('../middlewares/authentication')

router.get('/', gameController.renderHome);
router.get('/createGame', gameController.renderGame);
router.get('/home', gameController.returnHome);
router.get('/leaderBoard', gameController.renderLeaderBoard);
router.get('/signOut', gameController.logout);

module.exports = router
