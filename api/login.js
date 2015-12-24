var loginApi = function (app, passport) {   
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    }); 
}

var isLoggedIn = function(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = loginApi;




