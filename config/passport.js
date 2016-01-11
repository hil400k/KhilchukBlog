var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');
var mongoose = require('mongoose'); 

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        mongoose.model('User').findOne({'id': id}, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL
    },                                    
    function(token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            mongoose.model('User').findOne({ 'id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } 
//                else {
//                    // if the user isnt in our database, create a new user
//                    var newUser = {};
//
//                    // set all of the relevant information
//                    newUser.id    = profile.id;
//                    newUser.token = token;
//                    newUser.name  = profile.displayName;
//                    newUser.email = profile.emails[0].value; // pull the first email
//                    
//                    mongoose.model('User').create(newUser, function (err, user) {
//                        if (err)
//                            throw err;
//                        return done(null, newUser);
//                    });
//                }
            });
        });

    }));

};