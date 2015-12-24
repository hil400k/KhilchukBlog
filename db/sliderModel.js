var mongoose = require('mongoose');

var sliderScheme = mongoose.Schema({
     paths: []
});

mongoose.model('sliderModel', sliderScheme);