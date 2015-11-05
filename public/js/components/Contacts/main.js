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
            this.startBubblesAnimation();
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
        
        startBubblesAnimation: function () {
            this.initBubles();
        },
        
        getRandomArbitrary: function(min, max) {
          return Math.random() * (max - min) + min;
        },
        
        initBubble: function (param) {
            var bubblesContainer = param.bubblesContainer, bubble = param.bubble,
                size = param.size, positionX = param.positionX, positionY = param.positionY,
                newPositionX = param.newPositionX, positionY = param.positionY,
                blur = param.blur, delay = param.delay, i = param.i, sign = param.sign;
            
            bubblesContainer.append('<div class="bubble b' + i + '"></div>');
            bubble = bubblesContainer.find('.b' + i);
            size = parseInt(self.getRandomArbitrary(3, 15));
            positionX = parseInt(self.getRandomArbitrary(-80, 250));
            positionY = parseInt(self.getRandomArbitrary(-70, 70));
            newPositionX = parseInt(self.getRandomArbitrary(-80, 250));
            newPositionY = parseInt(self.getRandomArbitrary(-70, 70));
            blur = parseInt(self.getRandomArbitrary(0, 10));
            delay = parseInt(self.getRandomArbitrary(7, 17));
                
            bubble.css({
                'width': size + 'px',
                'height': size + 'px',
                'top': positionY,
                'left': positionX,
                '-webkit-filter': 'blur(' + blur + 'px)',
                '-moz-filter': 'blur(' + blur + 'px)',
                '-o-filter': 'blur(' + blur + 'px)',
                '-ms-filter': 'blur(' + blur + 'px)',
                'filter': 'blur(' + blur + 'px)',
                '-webkit-animation' : 'hiding ' + delay + 's infinite',
                'animation' : 'hiding ' + delay + 's infinite'
            });
            bubble.animate({
                'top' : newPositionX + 'px',
                'left' : newPositionY + 'px'
            }, (delay * 1000), function () {
                bubble.remove();
                sign ? i += 20 : i-=20;
                sign ? sign = false : sign = true;
                self.initBubble({ 
                      bubblesContainer: bubblesContainer,
                      size : size,
                      positionX: positionX,
                      positionY: positionY,
                      bubble : bubble,
                      blur: blur, 
                      delay : delay,
                      newPositionX: newPositionX,
                      newPositionY: newPositionY,
                      i: i,
                      sign: sign
                });
            });
        },
        
        initBubles: function () {
            var bubblesContainer = self.$el.find('.bubbles'),
                size, positionX, positionY, bubble, blur, delay, newPositionX, newPositionY, sign = true;
            
            for(var i = 0; i < 20; i++) {
                self.initBubble({ 
                      bubblesContainer: bubblesContainer,
                      size : size,
                      positionX: positionX,
                      positionY: positionY,
                      bubble : bubble,
                      blur: blur, 
                      delay : delay,
                      newPositionX: newPositionX,
                      newPositionY: newPositionY,
                      i: i,
                      sign: sign
                });
            }
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