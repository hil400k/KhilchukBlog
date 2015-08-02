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
            'click .reviews-block-button': 'buttonHandler',
            'keypress .input-component textarea': 'inputHandler'
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
        
        inputHandler: function(e) {
            var tarea = e.currentTarget, content = tarea.value, caret = null,
                $button = this.$el.find('.input-component button');
            
            
            if (e.keyCode == 13 && e.shiftKey) {   
                if ($button.text() === 'SEND') {
                    caret = this.getCaret(tarea);
                    tarea.value = content.substring(0, caret);
                    e.stopPropagation();
                } else {
                    e.preventDefault();
                    this.buttonHandler();
                }
            } else if(e.keyCode == 13) {
                e.preventDefault();
                this.buttonHandler();
            }
        },
        
        getCaret: function (el) {
            if (el.selectionStart) { 
                return el.selectionStart; 
            } else if (document.selection) { 
                el.focus(); 

                var r = document.selection.createRange(); 
                if (r == null) { 
                    return 0; 
                } 

                var re = el.createTextRange(), 
                    rc = re.duplicate(); 
                re.moveToBookmark(r.getBookmark()); 
                rc.setEndPoint('EndToStart', re); 

                return rc.text.length; 
            }  
            return 0; 
        },
        
        buttonHandler: function (e) {
            var $button = this.$el.find('.input-component button'),
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