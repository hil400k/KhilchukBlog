define([
    'jQuery',
    'Underscore',
    'Backbone'
], function ($, _, Backbone) {
    var aboutModel;

    aboutModel = Backbone.Model.extend({
        defaults: {
            'personalInfo': '',
            'workItems': [],
            'wiu': ''
        },

        idAttribute: '_id',

        url: './js/components/About/about.json'
    });

    return aboutModel;
});
