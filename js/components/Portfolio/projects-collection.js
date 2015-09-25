define([
    'module',
    'jQuery',
    'Underscore',
    'Backbone',
    './project'
], function(module, $, _, Backbone, Project) {
    var Projects;
    
    Projects = Backbone.Collection.extend({
        model: Project        
    });
    
    return Projects;
});