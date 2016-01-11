define([
    'jQuery',
	'Backbone',
    'jQCookie'
], function ($, Backbone) {
    var token = null;
    
    return {
        getAuthToken: function() {
            return token;
        },
        
        setAuthTokenByCookies: function() {
            if ($.cookie('token')) {
                token = $.cookie('token');
                return true;
            }
            
            return false;
        },
        
        setAuthTokenByServer: function(newToken) {
            if (newToken) {
                token = newToken;
                $.cookie('token', token);
            }            
        },
        
        removoAuthTokenFromCookies: function() {
            token = null;
            $.removeCookie('token');
        }        
    }
});