define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html'
], function (module, $, _, Backbone, tpl) {
	var component;
	
	component = Backbone.View.extend({
		el: '#footer',
        
        events: {
            'click .to-top-circle': 'toTop'
        },
        
        toTop: function () {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        },
		
		initialize: function (options) {
			this.$el.html(_.template(tpl));
			options.styleLoader(module);
		}
	});
	
	return component;
});