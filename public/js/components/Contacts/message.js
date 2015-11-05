define([
	'jQuery',
	'Underscore',
	'Backbone'
], function ($, _, Backbone) {
	var Message;
	
	Message = Backbone.Model.extend({
		defaults: {
            author: '',
            messageText: '',
            date: new Date()            
        },
        
        initialize: function () {
            this.on('invalid', function (model, error) {
                console.info(error);
            }); 
            this.on('change:messageText', function () {
                console.info('completed');
            })
        },
        
        validate: function (attrs) {
            if(!attrs.author && !this.get('author')) {
                return 'Incorect author name';
            } else if (!attrs.author && this.get('author')) {
                if (!attrs.messageText) {
                    return 'Incorect message text';
                }
            }            
        }
	});
	
	return Message;
});