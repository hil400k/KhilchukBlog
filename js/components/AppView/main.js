define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html',
	'Components/HeadNav/main',
	'Components/FooterNav/main',
	'Components/ContentView/main',
	'Viewport'
], function (module, $, _, Backbone, tpl, HeadNav, FooterNav, ContentView, Viewport) {
	var component;
	
	component = Backbone.View.extend({
		el: '#main',
		
		initialize: function (options) {
			var headNav = Viewport.create(this, 'HeadNav', HeadNav),
				contentView = Viewport.create(this, 'ContentView', ContentView),
				footerNav = Viewport.create(this, 'FooterNav', FooterNav);
			
			this.render();
			options.styleLoader(module);
		},
		
		render: function () {
		}
	});
	
	return component;
});

