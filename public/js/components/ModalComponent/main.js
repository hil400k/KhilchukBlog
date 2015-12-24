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
            this.subView = {};
			this.render();
			options.styleLoader(module);
            EventsManager.on('admin:edit', this.adminEditing, this);
		}, 
        
        adminEditing: function (data) {
            var self = this;
            this.subView = new data.view({model: data.model, el: '.modal-content'});
            this.$el.find('#myModal').on('hidden.bs.modal', function (e) {
                self.subView.$el.unbind();
            })
        },
        
		render: function () {
			this.$el.html(_.template(tpl));
		}
	});
	
	return component;
});