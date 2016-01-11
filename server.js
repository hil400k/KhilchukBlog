var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('./db/db');
var models = require('./db/models');
var bodyParser = require('body-parser');
var path = require('path');
var indexRoute = require('./routes/index');
var base = __dirname;
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use('/', indexRoute);

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./api/login')(app, passport);
require('./api/about')(app, base, passport);
require('./api/contacts')(app, passport);
require('./api/articles')(app, passport);
require('./api/portfolio')(app, passport);

app.listen(8000);
console.log('litening 8000');