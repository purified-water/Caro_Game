const passport = require('passport');
const Strategy = require('passport-strategy').Strategy;

class MyStrategy extends Strategy {
    constructor(verify, options) {
        super();
        this.name = 'myStrategy'; // Set a name for your strategy
        this.verify = verify; // Set the verify function for authentication
        // Any additional options or configuration can be handled here
        this.usernamefield = (options && options.username) ? options.username : "un";
        this.passwordfield = (options && options.password) ? options.password : "pw";
        passport.strategies[this.name] = this; // Register the strategy with Passport
    }

    authenticate(req, options) {
        // Implement the authentication logic here
        // Call this.success(user, info) if authentication is successful
        // Call this.fail(info) if authentication fails
        
        // Data is sensitive, so it should be in the request body
        const un = req.body[this.usernamefield];
        const pw = req.body[this.passwordfield];
        this.verify(un, pw, (err, user) => {
            if (err) {
                return this.fail(err);
            }

            if (!user) {
                return this.fail('invalid authenticate'); // 'fail' is a method of Passport
            }
            req.session.un = un;
            // console.log('session un', req.session.un);
            this.success(user);
        });
    }
}

module.exports = MyStrategy;