require.config({
	shim: {
		Underscore: {
			exports: '_'  
		},
		jQuery: {
			exports: '$'
		},
		Backbone: {
			deps: [
				'Underscore',
				'jQuery'
			],
			exports: 'Backbone'
		},
        Bootstrap: {
            deps: [
                'jQuery'
            ]
        }
	},
	paths: {
        Cookies: '../libs/js-cookie/src/js.cookie',
        Bootstrap: '../libs/bootstrap/dist/js/bootstrap',
		jQuery: '../libs/jquery/dist/jquery',
		Underscore: '../libs/underscore/underscore',
		Backbone: '../libs/backbone/backbone',
		text: '../libs/requirejs-text/text',
		Viewport: 'viewport',
        Settings: 'settings',
		EventsManager: 'events-manager',
		Router: 'router',
		Components: 'components'
    }
});

require([
	'Backbone',
	'Router',
	'Viewport',
    'Settings',
	'Components/AppView/main'
], function (Backbone, Router, Viewport, Settings, AppView) {
	var appView = Viewport.create({}, 'AppView', AppView);
	Router.initialize({appView: appView});
	Backbone.history.start();    
    Settings.setAuthTokenByCookies();
});


// var appView = Viewport.create({}, 'AppView', AppView);
// AppView is the main controller create 
