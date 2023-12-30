module.exports = {
    returnHome: async(req, res) => {
        // req.session.destroy();
        
        res.redirect('/');
    },

    logout: async(req, res) => {
        req.session.destroy();
        res.redirect('/logIn');
    }
}