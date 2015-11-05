var mongoose = require('mongoose');

var aboutScheme = mongoose.Schema({
     personalInfo: String,
     workItems: [],
     wiu: String
});

mongoose.model('About', aboutScheme);