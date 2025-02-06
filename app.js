var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./models/connection');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const cors = require("cors");

var app = express();
var session = require('express-session');
app.use(cors(
    {
        origin: 'http://127.0.0.1:5500',
        credentials: true
    }
));
app.use(session({
    secret: 'ton-secret-de-session',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Pour le développement local, met `secure: false`
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cartRouter);

module.exports = app;
