var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = require('./db/db');
var models = require('./db/models');
var bodyParser = require('body-parser');
var path = require('path');
var indexRoute = require('./routes/index');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use('/', indexRoute);

require('./api/about')(app);
require('./api/contacts')(app);
require('./api/articles')(app);
require('./api/portfolio')(app);

app.listen(8000);
console.log('litening 8000');