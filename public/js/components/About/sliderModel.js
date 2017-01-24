define([
    'jQuery',
    'Underscore',
    'Backbone'
], function ($, _, Backbone) {
    var aboutIModel;

    aboutIModel = Backbone.Model.extend({
        defaults: {
            'paths': [],
        },

        idAttribute: '_id',

        url: './js/components/About/sliderModel.json'
    });

    return aboutIModel;
});
