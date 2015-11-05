define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
    'Bootstrap',
    'EventsManager',
	'text!./tpl.html'
], function (module, $, _, Backbone, Bootstrap, EventsManager, tpl) {
	var component;
	
	component = Backbone.View.extend({
        el: '#modal',

		initialize: function (options) {
			this.render();
			options.styleLoader(module);
            EventsManager.on('admin:edit', this.adminEditing, this);            
		}, 
        
        adminEditing: function (data) {
            var view = new data.view({model: data.model, el: '.modal-content'});
        },
        
		render: function () {
			this.$el.html(_.template(tpl));
		}
	});
	
	return component;
});