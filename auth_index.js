const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebar = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const passport = require("passport");
// const server = require('http').createServer(app);
const https = require('https')
const port = process.env.AUTH_PORT || 3000;
const fs = require('fs');

// Goi session
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
}));
// // Gọi passport
// app.use(passport.initialize());
// app.use(passport.session());

// require('./middlewares/passport')(app);

// app.use('/css', express.static(__dirname + '/../css'));
// app.use('/js', express.static(__dirname + '/../_js'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.engine(
    "hbs",
    handlebar.engine({
      extname: "hbs",
    })
);
app.set('view engine', 'hbs');
app.set('views', './Server_Auth/views');

// Them de ket noi public voi views
app.use('/public', express.static(path.join(__dirname, '/Server_Auth/public')));




app.get('/', async (req, res, next) => {
    res.render("logIn");
    // res.render("signUp");
})
const signUpRoute = require('./Server_Auth/routers/signUp.r');
app.use('/signUp', signUpRoute);

const logInRoute = require('./Server_Auth/routers/logIn.r');
app.use('/login', logInRoute);

const requestRoute = require('./Server_Auth/routers/request.r');
app.use('/request', requestRoute);

const profileRoute = require('./Server_Auth/routers/profile.r');   
app.use('/profile', profileRoute);


const myCredential = {
    key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem'))
}

const server = https.createServer(myCredential, app);

server.listen(port, () => {
    console.log(`App listening on port https://localhost:${port}`)
});

