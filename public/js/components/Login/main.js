define([
	'module',
	'jQuery',    
	'Underscore',
	'Backbone',
    'Settings',
	'text!./tpl.html',
], function (module, $, _, Backbone, Settings, tpl) {
	var component, self, auth2;
	
	component = Backbone.View.extend({
        el: '#page',
        
		initialize: function (options) {
            self = this;

            this.$el.off();            
			self.render();            
			options.styleLoader(module);            
		}, 
        
        signIn: function () {
            var logout;
            $.get('/login/getUser', function (user) {
                if(user) {
                    self.$el.find('.sign-out-button-container').html('<br><a href="/logout" class="btn btn-default btn-sm btn-logout">Logout</a>');
                    console.info(Settings.getAuthToken());
                    if (!Settings.getAuthToken()) {
                        Settings.setAuthTokenByServer(user.token);
                    } 
                    logout = self.$el.find('.sign-out-button-container .btn-logout');
                    logout.off();
                    logout.on('click', function(e) {
                        Settings.removoAuthTokenFromCookies();
                    });
                }
            });
        },
		
		render: function () {
			this.$el.html(_.template(tpl));
            require(['//apis.google.com/js/platform.js'], this.signIn);
		}
	});
	
	return component;
});