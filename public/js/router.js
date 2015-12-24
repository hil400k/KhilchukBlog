define([
	'jQuery',
	'Backbone',
	'Viewport',
], function ($, Backbone, Viewport) {	
	var AppRouter = Backbone.Router.extend({
			routes: {
				'articles': 'articles',
				'about': 'about',
				'portfolio': 'portfolio',
				'contacts': 'contacts',
				'login': 'login',
                '*other' : 'default'
			}
	});
	
	var initialize = function (options) {
		var appView = options.appView;
		var router = new AppRouter(options);
		
		router.on('route:default', function () {
			require(['Components/About/main'], function (AboutPage) {
				var aboutPage = Viewport.create(appView.children.ContentView, 'About', AboutPage);
			});
		});
        
		router.on('route:about', function () {
			require(['Components/About/main'], function (AboutPage) {
				var aboutPage = Viewport.create(appView.children.ContentView, 'About', AboutPage);
			});
		});
        
        router.on('route:contacts', function () {
            require(['Components/Contacts/main'], function (ContactsPage) {
                var contactsPage = Viewport.create(appView.children.ContentView, 'Contacts', ContactsPage);
            });
        });
        
        router.on('route:portfolio', function () {
            require(['Components/Portfolio/main'], function (PortfolioPage) {
               var portfolioPage = Viewport.create(appView.children.ContentView, 'Portfolio', PortfolioPage);
            });
        });
        
        router.on('route:articles', function () {
            require(['Components/Articles/main'], function (ArticlesPage) {
               var articlesPage = Viewport.create(appView.children.ContentView, 'Articles', ArticlesPage);
            });
        });
        
        router.on('route:login', function () {
            require(['Components/Login/main'], function (LoginPage) {
               var loginPage = Viewport.create(appView.children.ContentView, 'Login', LoginPage);
            });
        });
	}
	
	return {
		'initialize': initialize
	};
});