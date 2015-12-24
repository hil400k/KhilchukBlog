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
    './AdminViews/PersonalInfo/main',
    './AdminViews/Wiu/main',
    './AdminViews/WorkItems/main'
], function (module, $, _, Backbone, tpl, TechSlider, Viewport, AboutModel, EventsManager, PersonalInfo, Wiu, WorkItems) {
	var component, self, y
	
	component = Backbone.View.extend({
		el: '#page',
        
        events: {
          'click .scroll-bottom-btn': 'scrollBottomDescription',
          'click .scroll-top-btn': 'scrollTopDescription',
          'click #personalInfo': 'editPersonalInfo',
          'click #workItems': 'editWorkItems',
          'click #wiu': 'editWiu',
        },
        
        model: new AboutModel(),
		
		initialize: function (options) {
            self = this;
            y = 0;
			options.styleLoader(module);    
            this.undelegateEvents();
            this.model.fetch({
                success: function (data) {
                    self.render();
                }
            });            
		},
        
        scrollBottomDescription: function (e) {
            var movable = this.$el.find('.description > p'),
                textHeight = movable.height(),
                descHeight = this.$el.find('.description').height() - 5;
            
            if (y > (textHeight - descHeight) * (-1.1)) {
                y -= descHeight;            
                movable.css({
                    'transform': 'translateY(' + y + 'px' + ')'
                });
            }
        },
        
        scrollTopDescription: function (e) {
            var movable = this.$el.find('.description > p'),
                descHeight = this.$el.find('.description').height() - 5;
            
            if (y < 0) {
                y += descHeight;            
                movable.css({
                    'transform': 'translateY(' + y + 'px' + ')'
                });
            }
        },
		
		render: function () {
            var data = this.model.toJSON(),
                compile = _.template(tpl);
            
			this.$el.html(compile(data));
			this.techSlider = Viewport.create(this, 'TechSlider', TechSlider, {'el': this.$el.find('.slider-wrapper')}); 
            this.model.on('personalInfo:server-changed', this.personalInfoChanged, this);
            this.model.on('workItems:server-changed', this.workItemsChanged, this);
            this.model.on('wiu:server-changed', this.wiuChanged, this);
		},
        
        workItemsChanged: function () {
            var owner = this.$el.find('.work-experience-content ul');
            
            owner.html('');
            _.each(this.model.get('workItems'), function (item) {
                owner.append('<li class="w-e-item">' + item + '</li>');
            });            
        },
        
        personalInfoChanged: function () {
            this.$el.find('.introduction > p').html(this.model.get('personalInfo'));
        },
        
        wiuChanged: function () {
            this.$el.find('.description > p').html(this.model.get('wiu'));
        },
        
        editPersonalInfo: function () {
            EventsManager.trigger('admin:edit', {
                view: PersonalInfo,
                model: this.model
            });
        },      
        
        editWorkItems: function () {
            console.info('qqqq');
            EventsManager.trigger('admin:edit', {
                view: WorkItems,
                model: this.model
            });
        },
        
        editWiu: function () {
            EventsManager.trigger('admin:edit', {
                view: Wiu,
                model: this.model
            });
        }
	});
	
	return component;
});