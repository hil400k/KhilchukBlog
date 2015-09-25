define([
	'module',
	'jQuery',
	'Underscore',
	'Backbone',
    './projects-collection',
	'text!./tpl.html',
    'text!./project.html'
], function (module, $, _, Backbone, Projects, tpl, projectTpl) {
	var component;
	
	component = Backbone.View.extend({        
        el: '#page',
        
        events: {
            'click .forward-button': 'goTop',
            'click .back-button': 'goDown',
            'click .slide': 'showProjectInMainWindow'
        },
        
		initialize: function (options) {
            var self = this;
            this.slideHeight = 0;
            this.slidesAbove = 0;
			this.render();
			options.styleLoader(module);
            setTimeout(function () {
                self.projects = new Projects([
                    {
                        id: "1",
                        name: 'Own Project',
                        description: 'This is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projects',
                        imgSrc: '/images/farm.png'
                    },
                    {
                        id: "2",
                        name: 'Own Project',
                        description: 'This This is one of my projectsis one of my projectsThis is This is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsone of my projectsThis is This is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsone of my projectsThis is This is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsone of my projects',
                        imgSrc: '/images/proj.png'
                    },
                    {
                        id: "3",
                        name: 'Own Project',
                        description: 'This is This is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsone of my projectsThis is This is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsone of my projectsThis is This is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsThis is one of my projectsone of my projects',
                        imgSrc: '/images/farm.png'
                    },
                    {
                        id: "4",
                        name: 'Own Project',
                        description: 'This is This is one of my projectsone of my projects',
                        imgSrc: '/images/farm.png'
                    }
                ]);
                self.renderProjects();
            }, 1000);
            var func = this.sliderResizing.bind(this);
            $(window).on('resize', func);
		}, 
        
        showProjectInMainWindow: function (e) {
            var currentSlideId = $(e.currentTarget).attr('slide-id'),
                currentSlide = this.projects.find(function(item) {
                    return item.get('id') === currentSlideId;
                }),
                $mainSlideWindow = this.$el.find('.img-wraper'),
                $projectTitle = this.$el.find('.project-title > span');
            
            $mainSlideWindow.animate({
                opacity: 0
            }, 250, function () {
                $mainSlideWindow.css({'background': 'url(' + currentSlide.get('imgSrc') + ')'});
                $mainSlideWindow.animate({
                    opacity: 1
                }, 250);
            });
            
            $projectTitle.text(currentSlide.get('description'));            
            
        },
        
        sliderResizing: function () {
            var slides = this.$el.find('.slide'),
                slideH = (slides.eq(0).height() + 12) * (-1),
                slideHeight = slideH * this.slidesAbove + 'px';
            
            this.slideHeight = slideH * this.slidesAbove;
            
            _.each(slides, function (slide, index) {
                $(slide).css({'transform': 'translateY(' + slideHeight + ')'});
            });
        },
        
        goTop: function () {
            var slides = this.$el.find('.slide'),
                currentTranslateValue = parseInt(this.$el.find('.slide').eq(0).css('transform').split(',')[5]),
                slideH = (slides.eq(0).height() + 12) * (-1),
                slideHeight = (slides.eq(0).height() + 12) * (-1) + 'px',
                self = this;
            
            if (this.slideHeight) {
                this.slideHeight -= slideH;
                slideHeight = this.slideHeight + 'px';
                
                this.slidesAbove --;
                _.each(slides, function (slide, index) {
                    $(slide).css({'transform': 'translateY(' + slideHeight + ')'});
                });                
            }
            
        },
        
        goDown: function (e) {            
            var slides = this.$el.find('.slide'),
                currentTranslateValue = parseInt(this.$el.find('.slide').eq(0).css('transform').split(',')[5]),
                slideH = (slides.eq(0).height() + 12) * (-1),
                slideHeight = (slides.eq(0).height() + 12) * (-1) + 'px',
                self = this;
            
            if ((this.slideHeight * (-1)) < (slideH * (-1) * (slides.length - 2))) {
                this.slideHeight += slideH; 
                if (!currentTranslateValue || this.slideHeight >= (slideH * 2)) {
                    this.slidesAbove ++;
                    slideHeight = this.slideHeight + 'px';
                    _.each(slides, function (slide, index) {
                        $(slide).css({'transform': 'translateY(' + slideHeight + ')'});
                    });
                }
            }            
        },
		
		render: function () {
			this.$el.html(_.template(tpl));
		},
        
        renderProjects: function () {
            var $projectsOwner = this.$el.find('.slides-wrap'),
                projTpl = _.template(projectTpl),
                self = this;
            self.projects.each(function(project, index) {
                $projectsOwner.append(projTpl({'project': project.toJSON()}));
                self.$el.find('.slide').eq(index).find('.project-box').css({
                    'background': 'url(' + project.get('imgSrc') + ')',
                    'background-size': '200%', 
                    'background-repeat': 'no-repeat', 
                    'background-position': '50%'});
                if (index === 0) {
                    self.$el.find('.img-wraper').css({'background': 'url(' + project.get('imgSrc') + ')'});
                    self.$el.find('.project-title > span').text(project.get('description'));
                    self.$el.find('h3').text(project.get('name'));
                }
            });
            self.$el.find('.spinner').hide();
            self.$el.find('.loader-back').hide();
        }
        
	});
	
	return component;
});