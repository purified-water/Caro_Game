const path = require("path");
const userModel = require('../models/users.m')
const onlineUsersPath = path.join(__dirname, '../db/onlineUsers.json');

let onlineUsers = require(onlineUsersPath);
module.exports = {
    renderHome: async(req, res) => {
        // req.session.destroy();
        // TO DO: Get online users and online rooms
        const cookie = req.cookies;
        // console.log('Online users: ', onlineUsers);
        res.render('home', {onlineUsers: onlineUsers, cookie: cookie});
    },
    renderGame: async(req, res) => {

        res.render('gameroom', {roomid: '5'});
    },
    renderLeaderBoard: async(req, res) => {
        res.render('leaderBoard');
    },
    
    returnHome: async(req, res) => {
        
        res.redirect('/');
    },

    logout: async(req, res) => {
        await userModel.removePlayerFromOnlineList(req.cookies.username);
        res.clearCookie('accessToken');
        res.clearCookie('username');
        res.clearCookie('fullname');
        res.redirect('/logIn');
    }
}