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
        Bootstrap: '../libs/bootstrap/dist/js/bootstrap',
		jQuery: '../libs/jquery/dist/jquery',
		Underscore: '../libs/underscore/underscore',
		Backbone: '../libs/backbone/backbone',
		text: '../libs/requirejs-text/text',
		Viewport: 'viewport',
		EventsManager: 'events-manager',
		Router: 'router',
		Components: 'components'
	}
});

require([
	'Backbone',
	'Router',
	'Viewport',
	'Components/AppView/main'
], function (Backbone, Router, Viewport, AppView) {
	var appView = Viewport.create({}, 'AppView', AppView);
	Router.initialize({appView: appView});
	Backbone.history.start();
});


// var appView = Viewport.create({}, 'AppView', AppView);
// AppView is the main controller create 
