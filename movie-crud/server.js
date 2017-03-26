// modules =================================================
var express        	= require('express');
var app            	= express();
var mongoose       	= require('mongoose');
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var expressSession	= require('express-session');
var hash 			= require('bcrypt-nodejs');
var path 			= require('path');
var passport 		= require('passport');
var localStrategy	= require('passport-local' ).Strategy;
var debug 			= require('debug')('passport-mongo');


var movies = require('./app/movie-crud');
var theaters = require('./app/theater-crud');
var city = require('./app/city-crud');
var showtime = require('./app/showtime-crud');
var assignMovie = require('./app/assign-movie-crud');
var assignShowTime = require('./app/assign-show-time-crud');
var bookMovies = require('./app/book-movie-crud');
var availableTicket= require ('./app/available-movie-ticket-crud');
var User = require('./app/models/user.js');

// configuration ===========================================
	
// config files
//var db = require('./config/db');

app.use(bodyParser.json({})); // parse application/json 
app.use('/movi', movies);
app.use('/thtr', theaters);
app.use('/city', city);
app.use('/stim', showtime);
app.use('/asmv', assignMovie);
app.use('/asst', assignShowTime);
app.use('/avtc', availableTicket);
app.use('/bktc', bookMovies);


var mongo = require('mongodb');

var dbHost = 'mongodb://localhost:27017/moviedata';
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});


/* middleware added */

var routes = require('./app/auth.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', routes);


/* middleware ended */

var port = process.env.PORT || 3000; // set our port
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ================================================+==
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app