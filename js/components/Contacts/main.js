define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
    './message',
    './messages-collection',
	'text!./tpl.html',
	'text!./message.html'
], function (module, $, _, Backbone, Message, Messages, tpl, messageTpl) {
	var component, self;
	
	component = Backbone.View.extend({
        el: '#page',
        
        events: {
            'click .reviews-block-button': 'buttonHandler'
        },
        
		initialize: function (options) {
            self = this;
			this.render();
			options.styleLoader(module);
            this.messages = new Messages();
            this.message = new Message();
            this.listenTo(this.messages, 'add', function () {
                self.renderMessages();
            })
		}, 
		
		render: function () {
			this.$el.html(_.template(tpl));
		},
        
        renderMessages: function () {
            var msgTpl = _.template(messageTpl);
            this.$el.find('.messages-container').html('');
            this.messages.each(function (message) {
                self.$el.find('.messages-container').append(msgTpl({'message' : message.toJSON()}));
            });
        },
        
        buttonHandler: function (e) {
            var $button = $(e.currentTarget),
                $tarea = this.$el.find('.input-component textarea'),
                text, option, placeholder;
                    
            $button.text() === 'SEND' ? (text = 'CONFIRM NAME', option = 'name-option', placeholder = 'ENTER YOUR NAME:', this.message.set('messageText', $tarea.val(), {validate: true})) : (text = 'SEND', option = 'message-option', placeholder = 'ENTER YOUR MESSAGE:', this.message.set('author', $tarea.val(), {validate: true}));
            $button.addClass('change-text-transition');
            $button.text() === 'SEND' ? this.addMessage() : null;
            setTimeout(function () { 
                $button.text(text); $button.removeClass('change-text-transition'); 
                $tarea.removeClass(function (index, css) {
                    return (css.match (/\w+\-option$/) || []).join(' ');
                });
                $tarea.addClass(option);
                $tarea.attr('placeholder', placeholder);
                $tarea.val('');
            }, 500);          
        },
        
        addMessage: function () {
            this.messages.add(this.message);
            this.message = new Message();
        }
        
	});
	
	return component;
});