define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html'
], function (module, $, _, Backbone, tpl) {
	var component, self;
	
	component = Backbone.View.extend({
		
		events: {
			'click .to-bottom ': 'nextPage',
			'click .to-top': 'previousPage'
		},
		
		initialize: function (options) {
			self = this;
			$(window).on('resize', function (){ self.resizeSlider(); });
			this.topPage = 0;
			this.render();
		}, 
		
		render: function () {
			this.$el.html(_.template(tpl));
		},
		
		resizeSlider: function () {
			this.$el.find('.part').css('transform', 'translateY(0)');
		},
		
		nextPage: function() {
			if (this.topPage <= 1) {
				this.topPage ++;
			} else {
				return;
			}
			var partHeight = this.$el.find('.wrap').outerHeight(true) / 2,
				translation = '-' + (partHeight * this.topPage + 2) + 'px';
			this.$el.find('.part').css('transform', 'translateY(' + translation + ')');
		},
		
		previousPage: function () {
			if (this.topPage >= 1) {
				this.topPage --;
			} else { 
				return;
			}
			var partHeight = this.$el.find('.part').height(),
				translation = '-' + (partHeight * this.topPage + 2) + 'px';
			this.$el.find('.part').css('transform', 'translateY(' + translation + ')');
		}
									 
	});
	
	return component;
});