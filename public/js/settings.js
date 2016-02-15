define([
    'jQuery',
	'Backbone',
    'Cookies'
], function ($, Backbone, Cookies) {
    var token = null;
    
    return {
        getAuthToken: function() {
            return token;
        },
        
        setAuthTokenByCookies: function() {
            if (Cookies.get('token')) {
                token = Cookies.get('token');
                return true;
            }
            
            return false;
        },
        
        setAuthTokenByServer: function(newToken) {
            if (newToken) {
                token = newToken;
                Cookies.set('token', token);
            }            
        },
        
        removoAuthTokenFromCookies: function() {
            token = null;
            Cookies.remove('token');
        }        
    }
});