define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
    './message'
], function(module, $, _, Backbone, Message) {
	var Messages;
	
	Messages = Backbone.Collection.extend({
		model: Message        
        
	});
	
	return Messages;
});