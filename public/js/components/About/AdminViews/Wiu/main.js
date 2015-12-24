define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html'
], function (module, $, _, Backbone, tpl) {
	var component;
	
	component = Backbone.View.extend({
		events: {
            'click .save': 'save'
        },
        
		initialize: function (options) {
            self = this;
			this.render();
		}, 
        
        save: function (e) {
            this.model.set('wiu', this.$el.find('textarea').val());
            this.model.save(null, { 
                success: function () {
                    self.model.trigger('wiu:server-changed');
                }
            }); 
        },
		
		render: function () {
            var compile = _.template(tpl);
			this.$el.html(compile(this.model.toJSON()));
		}
	});
	
	return component;
});