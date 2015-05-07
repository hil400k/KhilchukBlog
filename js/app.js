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
		}		
	},
	paths: {
		jQuery: '../node_modules/jquery/dist/jquery',
		Underscore: '../node_modules/underscore/underscore',
		Backbone: '../node_modules/backbone/backbone',
		text: '../node_modules/requirejs-text/text',
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
