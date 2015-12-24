var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: String,
    token: String,
    email: String,
    name: String
});

mongoose.model('User', userSchema);