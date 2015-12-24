define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html'
], function (module, $, _, Backbone, tpl) {
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
            gapi.load('auth2', function() {
                 gapi.signin2.render('my-signin2', {
                    'scope': 'https://www.googleapis.com/auth/plus.login',
                    'width': '300',
                    'height': 50,
                    'longtitle': true,
                    'theme': 'dark'
                  });
                 gapi.auth2.init({
                     fetch_basic_profile: true,
                     client_id: '11599710881-3hhgtkl1bbrmcbv39umn64ngpgtr2g94.apps.googleusercontent.com',
                     scope:'profile'
                 }).then(function (){
                     auth2 = gapi.auth2.getAuthInstance();
                     auth2.isSignedIn.listen(self.updateSignIn.bind(self));
                     auth2.then(self.updateSignIn.call(self));
                 });
            });
        },
        
        updateSignIn: function () {
             var btn;
            
             if (auth2.isSignedIn.get()) {
                 this.$el.find('.sign-out-button-container').html('<br><button class="btn btn-primary">Sign out</button>');
                 btn = this.$el.find('.sign-out-button-container .btn');
                 btn.on('click', function () {
                     auth2.signOut();
                 });
                 console.info(auth2.currentUser.get().getBasicProfile());
             } else {
                 self.$el.find('.sign-out-button-container').html('');
             }
        },
		
		render: function () {
			this.$el.html(_.template(tpl));
            require(['//apis.google.com/js/platform.js'], this.signIn);
		}
	});
	
	return component;
});