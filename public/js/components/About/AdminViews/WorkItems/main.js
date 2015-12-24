define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html',
	'text!./wiTpl.html'
], function (module, $, _, Backbone, tpl, wiTpl) {
	var component, self;
	
	component = Backbone.View.extend({
        events: {
            'click .btn-remove': 'remove',
            'click .btn-add': 'add',
            'click .save': 'save'
        },     
        
		initialize: function (options) {
            self = this;
			this.render();
		}, 
        
        remove: function (e) {
            var li = $(e.currentTarget).parents('li').eq(0),
                lis = this.$el.find('li'),
                elemIndex = lis.index(li);
            
            li.remove();
             this.model.get('workItems').splice(elemIndex, 1);
        },
        
        add: function (e) {
            var compile = _.template(wiTpl),
                ul = this.$el.find('ul');
            
            ul.append(compile());
             this.model.get('workItems').push('');            
        },
        
        save: function (e) {
            var textA = this.$el.find('textarea'),
                newVal = [];
            
            textA.each(function (index, ta) {
               newVal.push($(ta).val());
            });
            
            this.model.set('workItems', newVal);
            this.model.save(null, { 
                success: function () {
                    self.model.trigger('workItems:server-changed');
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