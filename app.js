'use strict';

//require dependencies
require('dotenv').config();
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var expressJwt = require('express-jwt');
var logger = require('morgan');


//require routes
var search = require('./routes/search.js');
var auth = require('./routes/auth.js');
var signup = require('./routes/signup.js');
var users = require('./routes/users.js');

//fire up the app
var app = express();

//set up port
var port = process.env.PORT || 3000;

//add middleware - use dependencies
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));
app.use(cors());

//middleware routes
app.use('/search', search);
app.use('/signup', signup);
app.use('/auth', auth); //no access if no token
app.use(expressJwt({ secret: process.env.SECRET})); //all routes from here on are restricted to users with tokens
app.use('/users', users); //, expressJwt({secret: 'INTERCAMBIOSECRETKEY'})


// error handling
app.use(function (req, res, next) {
    let err = new Error('Route not found.');
    err.status = 404;
    next(err);
});

if(app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).json({err:err});
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
});


//listen on appropriate port
app.listen(port, function () {
    console.log('Application is running on port:', port);
});


//export app module
module.exports = app;
