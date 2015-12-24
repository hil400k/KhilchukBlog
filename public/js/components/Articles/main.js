define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html'
], function (module, $, _, Backbone, tpl) {
	var component;
	
	component = Backbone.View.extend({
        el: '#page',
        
		initialize: function (options) {
            this.$el.off();
			this.render();
			options.styleLoader(module);
		}, 
		
		render: function () {
			this.$el.html(_.template(tpl));
		}
	});
	
	return component;
});