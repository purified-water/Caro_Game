const passport = require("passport");
const CustomStrategy = require("./myStrategy");
const flash = require("express-flash");
const User = require("../models/users.m");

passport.serializeUser((user, done) => {
    // console.log('Serialize user', user);
    done(null, user);
});
passport.deserializeUser(async (username, done) => {
    // Retrieve the user from the database using the username 

    const user = User.getPlayerInfos(username);
    // console.log('DEESerialize user', user);

    if (user != null) {
        done(null, user.username);
    } else {
        done("Invalid user", null);
    }
});

const verifyCallback = async (username, done) => {
    // console.log('passport calling back', username);
    if (username != null) {
        const user = await User.getPlayerInfos(username);
        if (user != null) {
            return done(null, user.username);
        }
    }
    return done(null, false);
};

const customFields = {
    accessToken: "accessToken",
};

module.exports = (app) => {
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new CustomStrategy(verifyCallback, customFields));
};
