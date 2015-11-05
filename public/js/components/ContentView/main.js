define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html'
], function (module, $, _, Backbone, tpl) {
	var component;
	
	component = Backbone.View.extend({
		el: '#main-container',
		
		initialize: function (options) {
			this.render();
			options.styleLoader(module);
		},
		
		render: function () {
			this.$el.html(_.template(tpl));
		}
	});
	
	return component;
});