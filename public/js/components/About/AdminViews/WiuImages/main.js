define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
	'text!./tpl.html'
], function (module, $, _, Backbone, tpl) {
	var component, self, files;
	
	component = Backbone.View.extend({
		events: {
            'click .save': 'save',
            'change input[type=file]': 'prepareUpload',
            'submit form': 'sendFiles',
            'click .btn-remove': 'remove',
            'click .remove': 'removeSelected'
        },
        
		initialize: function (options) {
            self = this;
            this.removedFiles = [];
			this.render();
		}, 
        
        sendFiles: function (e) {
            e.stopPropagation();
            e.preventDefault();
            var data = new FormData();
            _.each(files, function (file, index) {
               data.append('imgs', file, file.name); 
            });
             $.ajax({
                url: 'about/images/upload',
                type: 'POST',
                data: data,
                processData: false,
                contentType: false,
                success: function (data) {
                    self.model.set('paths', data.paths);
                }
            });
        },
        
        removeSelected: function () {
            var newPaths = [], item = null;
            
            _.each(this.model.get('paths'), function (el) {                
                item = _.some(self.removedFiles, function (eel) {
                    return eel === el;
                });
                
                !item ? newPaths.push(el) : item = null;
            });
            
            this.model.set('paths', newPaths);
            this.model.save({
                success: function (data) {
                    
                }
            })
        },
        
        remove: function (e) {
            var el = $(e.currentTarget).parents('.tech-slider-img-item').eq(0),
                img = el.find('img').attr('src');
            
            el.remove();
            this.removedFiles.push(img);
        },
        
        prepareUpload: function(e) {
            files = e.target.files;
        },
        
        save: function (e) {
            this.model.set('wiuImages', this.$el.find('textarea').val());
            this.model.save(null, { 
                success: function () {
                    self.model.trigger('wiu:server-changed');
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