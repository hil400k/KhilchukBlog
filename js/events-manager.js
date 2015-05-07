define([
	'jQuery',
	'Underscore',
	'Backbone'
], function ($, _, Backbone) {
	var EventsManager = _.extend({}, Backbone.Events);
	
	return EventsManager;
});