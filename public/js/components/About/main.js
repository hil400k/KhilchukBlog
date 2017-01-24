define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
  'Settings',
	'text!./tpl.html',
	'./TechSlider/main',
	'Viewport',
  './aboutModel',
  'EventsManager'
], function (module, $, _, Backbone, Settings, tpl, TechSlider, Viewport, AboutModel, EventsManager) {
	var component, self, y

	component = Backbone.View.extend({
		el: '#page',

    events: {
      'click .scroll-bottom-btn': 'scrollBottomDescription',
      'click .scroll-top-btn': 'scrollTopDescription'
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

    scrollBottomDescription: function (e) {console.info('he');
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

      data.token = Settings.getAuthToken();
			this.$el.html(compile(data));
			this.techSlider = Viewport.create(this, 'TechSlider', TechSlider, {'el': this.$el.find('.slider-wrapper')});
		}
	});

	return component;
});
