define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html'
], function (module, $, _, Backbone, tpl) {
	var component;
	
	component = Backbone.View.extend({
		initialize: function (options) {
			this.render();
			options.styleLoader(module);
		}, 
		
		render: function () {
			
		}
	});
	
	return component;
});