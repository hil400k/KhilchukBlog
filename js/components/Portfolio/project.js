define([
    'jQuery',
    'Underscore',
	'Backbone'
], function ($, _, Backbone) {
	var Project;
    
    Project = Backbone.Model.extend({
        defaults: {
            name: 'Own Project',
            description: 'This is one of my projects',
            imgSrc: ''
        }
    });
    
    return Project;
});