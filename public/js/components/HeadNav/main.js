define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html'
], function (module, $, _, Backbone, tpl) {
	var component;
	
	component = Backbone.View.extend({
		el: '#header',
		
		events: {
			'click .menu-item a': 'changeActive',
            'click .menu-button': 'menuHandler'
		},
		
		initialize: function (options) {
			this.$el.html(_.template(tpl));
			options.styleLoader(module);
		},
        
        menuHandler: function () {
            var $navbar = this.$el.find('#navbar'),
                $navbars = this.$el.find('.navbar-style');
            
            if ($navbar.hasClass('active') || $navbars.hasClass('active')) {
                $navbar.removeClass('active');
                $navbars.removeClass('active');
            } else {
                $navbar.addClass('active');
                $navbars.addClass('active');
            }
        },
		
		changeActive: function (e) {
			var $items = this.$el.find('.menu-item a');
				
			_.each($items, function (item) {
				$(item).removeClass('active');
			});
			$(e.currentTarget).addClass('active');
		}
	});
	
	return component;	
});