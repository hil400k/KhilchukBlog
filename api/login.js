var loginApi = function (app, passport) {   
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/#');
    }); 
    
    app.get('/login/getUser', function(req, res) {
        res.json(req.user);
    });
    
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    
    app.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/#login',
                failureRedirect : '/#login'
        }));
}

module.exports = loginApi;




