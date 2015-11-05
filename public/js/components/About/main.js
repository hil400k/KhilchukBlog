define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html',
	'./TechSlider/main',
	'Viewport',
    './aboutModel',
    'EventsManager',
    './AdminViews/PersonalInfo/main'
], function (module, $, _, Backbone, tpl, TechSlider, Viewport, AboutModel, EventsManager, PersonalInfo) {
	var component, self;
	
	component = Backbone.View.extend({
		el: '#page',
        
        events: {
          'mouseenter .scroll-bottom-btn': 'scrollDescription',
          'click #personalInfo': 'editPersonalInfo',
          'click #workItems': 'editWorkItems',
          'click #wiu': 'editWiu',
        },
        
        model: new AboutModel(),
		
		initialize: function (options) {
            self = this;
			options.styleLoader(module);
            this.model.fetch({
                success: function (data) {
                    self.render();
                }
            })
            
		},
        
        scrollDescription: function (e) {
            console.info('hello');
        },
		
		render: function () {
            var data = this.model.toJSON(),
                compile = _.template(tpl);
            
			this.$el.html(compile(data));
			this.techSlider = Viewport.create(this, 'TechSlider', TechSlider, {'el': this.$el.find('.slider-wrapper')}); 
            this.model.on('personalInfo:server-changed', this.personalInfoChanged, this);
		},
        
        personalInfoChanged: function () {
            this.$el.find('.introduction > p').html(this.model.get('personalInfo'));
        },
        
        editPersonalInfo: function () {
            EventsManager.trigger('admin:edit', {
                view: PersonalInfo,
                model: this.model
            });
        }
        
//        editWorkItems: function () {
//            var data = this.model.toJSON(),
//                compile = _.template(wiet);
//            
//            
//            EventsManager.trigger('admin:edit', {
//                tpl: compile(data),
//                model: self.model
//            });
//        },
//        
//        editWiu: function () {
//            var data = this.model.toJSON(),
//                compile = _.template(wet);
//            
//            EventsManager.trigger('admin:edit', {
//                tpl: compile(data),
//                model: self.model
//            });
//        }
	});
	
	return component;
});