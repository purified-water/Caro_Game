const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebar = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const passport = require("passport");
const server = require('http').createServer(app);

const port = process.env.GAME_PORT || 3000;
const helpers = require('./Server_Game/utils/helpers');


// Goi session
const secretKey = process.env.SECRET;
app.use(cookieParser(secretKey));
app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 15 * 60 * 1000,
        },
    })
);
// // Gọi passport
// app.use(passport.initialize());
// app.use(passport.session());


app.use('/css', express.static(__dirname + '/Server_Game/public/css'));
app.use('/js', express.static(__dirname + '/Server_Game/public/js'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());


app.engine(
    "hbs",
    handlebar.engine({
        extname: "hbs",
        //   helpers,
    })
);

app.set('view engine', 'hbs');
app.set('views', './Server_Game/views');

// Them de ket noi public voi views
app.use('/public', express.static(path.join(__dirname, '/Server_Game/public')));




// app.get('/', async (req, res, next) => {
//     // res.render("logIn");
//     // res.render("logIn");
//     const cookie = req.cookies;
//     console.log('\tCookies in game', cookie);
//     const username = req.cookies.username || 'empty';
//     const accessToken = req.cookies.accessToken || 'empty';
//     // res.render('home', {username: username, accessToken: accessToken, roomid: '5'})
//     res.render('gameroom', {username: username, accessToken: accessToken, roomid: '5'})
// })

require('./Server_Game/middlewares/passport')(app);

const authRoute = require('./Server_Game/routers/auth.r')();
app.use('/', authRoute);

const authMiddleware = require('./Server_Game/middlewares/authenticate');
app.use(authMiddleware.authorize);
console.log('Authorize called');

const gameRoute = require('./Server_Game/routers/game.r');
app.use('/', gameRoute);

// const logInRoute = require('./routers/logIn.r');
// app.use('/user', logInRoute);

// const signUpRoute = require('./routers/signUp.r');
// app.use('/signUp', signUpRoute);

// const homeRoute = require('./routers/home.r');
// app.use('/home', homeRoute);

const signOutRoute = require('./Server_Game/routers/signOut.r');
app.use('/signOut', signOutRoute);


// Chat socket io server
// const io = require('socket.io')(server);
// io.on('connection', client => {
//     console.log('Connected to id: ', client.id);

//     unreadMessages[client.id] = 0;
//     client.on('message', (message, username) => {
//         console.log('Message received from ', username, ': ', message);
//         unreadMessages[client.id] += 1;
//         // Broadcast the message to all other clients
//         io.emit('message', message, username);

//         io.to(client.id).emit('unreadCount', unreadMessages[client.id]);
//     });

//     client.on('disconnect', () => {
//         console.log('A user disconnected');
//       });
// })

app.get('/chat', (req, res) => {
    // console.log('user chat', req.user);
    res.render('chat', { username: req.user.Name });
})


server.listen(port, () => {
    console.log(`Game Server running on http://localhost:${port}`)
});

// SỬA BOARD

