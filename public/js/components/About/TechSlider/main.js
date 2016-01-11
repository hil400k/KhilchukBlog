define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
    'Settings',
    'EventsManager',
    '../AdminViews/WiuImages/main',
    '../sliderModel',
	'text!./tpl.html'
], function (module, $, _, Backbone, Settings, EventsManager, wiuImages, sliderModel, tpl) {
	var component, self;
	
	component = Backbone.View.extend({
		
		events: {
			'click .to-bottom ': 'nextPage',
			'click .to-top': 'previousPage',
            'click #wiuImages': 'editWiuImages'
		},
        
        model: new sliderModel(),
		
		initialize: function (options) {
			self = this;
			$(window).on('resize', function (){ self.resizeSlider(); });
			this.topPage = 0;
            this.model.fetch({
                success: function () {
                    self.render();
                }
            });	
            
		}, 
		
		render: function () {
            var compile = _.template(tpl),
                data = this.model.toJSON();
            
            data.token = Settings.getAuthToken();
			this.$el.html(compile(data));
            this.model.on('change', this.render, this);
		},
        
        editWiuImages: function () {
            EventsManager.trigger('admin:edit', {
                view: wiuImages,
                model: this.model
            });
        },        
		
		resizeSlider: function () {
			this.$el.find('.part').css('transform', 'translateY(0)');
            this.topPage = 0;
		},
		
		nextPage: function() {
            var n = 0;
            ((this.model.get('paths').length - 4) % 2 === 0) ? n = (this.model.get('paths').length - 4) / 2 - 1 : n = (this.model.get('paths').length - 4) / 2;
			if (this.topPage <= n){
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