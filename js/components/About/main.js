define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html',
	'./TechSlider/main',
	'Viewport'
], function (module, $, _, Backbone, tpl, TechSlider, Viewport) {
	var component;
	
	component = Backbone.View.extend({
		el: '#page',
        
        events: {
          'mouseenter .scroll-bottom-btn': 'scrollDescription'  
        },
		
		initialize: function (options) {
			options.styleLoader(module);
			this.render();
		},
        
        scrollDescription: function (e) {
            console.info('hello');
        },
		
		render: function () {
			this.$el.html(_.template(tpl));
			this.techSlider = Viewport.create(this, 'TechSlider', TechSlider, {'el': this.$el.find('.slider-wrapper')});
		}
	});
	
	return component;
});