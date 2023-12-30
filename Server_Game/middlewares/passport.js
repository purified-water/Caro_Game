// const passport = require("passport");
// const MyStrategy = require("../customSPP");
// const userModel = require("../models/users.m");
// const bcrypt = require('bcrypt');

// passport.serializeUser((user, done) => {
//     done(null, user.Username);
// });

// passport.deserializeUser(async (username, done) => {
//     // console.log('Username now', username);
//     const name = username;
//     const user = await userModel.getByUN(name);

//     if (!user) {
//         // console.log('local passport no user');
//         return done(null, false);
//     }
//     done(null, user);
// });

// module.exports = app => {
//     // app.use(passport.initialize());
//     // app.use(passport.session());
    
//     // Tao strategy compare password
//     passport.use(
//         new MyStrategy(async (un, pw, done) => {
//             // console.log("PASSPORT: ", un, pw);
//             const query = await userModel.getByUN(un);
//             const passwordInDB = query.Password;
//             // console.log('DB PW', passwordInDB);
//             if (!query) {
//                 return done(null, false); // User not found
//             }

//             let match = bcrypt.compareSync(pw, passwordInDB);
//             if (match) {
//                 // console.log('LOGGED IN');
//                 // console.log('MATCH query', query);
                
//                 return done(null, query);
//             }
//             // done('Couldnt authenticate');
//             done(null, false, { message: 'Incorrect password' });
//         }, {

//         })
//     );
// };
