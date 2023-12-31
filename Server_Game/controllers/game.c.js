module.exports = {
    renderHome: async(req, res) => {
        // req.session.destroy();
        // TO DO: Get online users and online rooms
        const cookie = req.cookies;
        res.render('home');
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
        res.clearCookie('accessToken');
        res.clearCookie('username');
        res.clearCookie('fullname');
        res.redirect('/logIn');
    }
}