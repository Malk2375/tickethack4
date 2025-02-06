var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./models/connection');
const cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');



var app = express();
var session = require('express-session');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cartRouter);
const bookingsRouter = require('./routes/bookings');
app.use(bookingsRouter);

module.exports = app;
