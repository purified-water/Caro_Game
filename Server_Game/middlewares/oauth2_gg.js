const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModels = require('../models/users.m');

const GOOGLE_CLIENT_ID = "805584916306-3aumahbnk6hb6jn8qrjabi4ve02nvp4q.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/user/google/callback",
    passReqToCallback: true
    },async function(req, accessToken, refreshToken, profile, cb) {
        const email = profile.emails[0].value;
        let user = await userModels.getByMail(email);
        // console.log('\tUSER exists', email, user);
        if (!user) {
            // console.log('SIGNING UP WITH GOOGLE', profile.name.givenName, 'none', profile.displayName, email);
            await userModels.add(profile.name.givenName, 'none', profile.displayName, email, '2000-01-01', 1);
        }


        req.session.user = await userModels.getByMail(email);
        // console.log('\tAdded session user profile', profile);
        return cb(null, profile.name.givenName);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});