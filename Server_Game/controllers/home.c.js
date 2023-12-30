module.exports = {
    returnHome: async(req, res) => {
        // req.session.destroy();

        res.redirect('/categories');
    },

    logout: async(req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}