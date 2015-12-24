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
        
        url: '/about/images'
    });
    
    return aboutIModel;
});