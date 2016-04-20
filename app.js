var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');
var mongoose = require("./db/db");

var api =  require('./routes/api');
var routers = require('./routes/route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
/*app.set('view engine', 'ejs');*/
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use( bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),{index:false}));
app.use(session({
    secret: 'react-redux-demo',
    name: 'react-redux-demo',
    saveUninitialized: false, // don't create session until something stored
    resave: false,//don't save session if unmodified
    unset:'destroy',//The session will be destroyed (deleted) when the response ends.
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use('/', routers);
app.use('/api', api);

module.exports = app;
