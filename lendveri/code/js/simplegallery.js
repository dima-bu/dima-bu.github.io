/*!
 * jQuery simple gallery Plugin 1.1.0
 *
 * http://fernandomoreiraweb.com/
 *
 * Copyright 2013 Fernando Moreira
 * Released under the MIT license:
 *   http://mit.fernandomoreiraweb.com/
 */
;(function($, window, document, undefined) {

    $.fn.simplegallery = function(options) {

        var defaults = {
            'galltime': 300,
            'gallcontent': '.gallery-content',
            'gallthumbnail': '.thumbnail',
            'gallthumb': '.thumb'
        };

        var settings = $.extend({}, defaults, options);

        return this.each(function() {

            $(settings.gallthumb).click(function() {

                var img_attr = $(this).find('img').attr("id"),
                    image_id = img_attr.replace('thumb_', '');

                var currentThumb =  $(settings.thumbId).find('.thumb.active');
                var currentImg = $(settings.galleryId).find('.gallery-content img.current');

                var nextThumb = $(this);
                var nextImg = $(settings.galleryId).find('.image_' + image_id + '');

                debugger;

                currentThumb.removeClass('active');
                nextThumb.addClass('active');

                currentImg.css({opacity: 1.0}).animate({opacity: 0.0}, settings.galltime, function(){
                    currentImg.hide();
                    nextImg.css({opacity: 0.0}).show().animate({opacity: 1.0}, settings.galltime);
                    currentImg.removeClass('current');
                    nextImg.addClass('current');
                });

                //currentImg.animate({opacity: 0.0}, 1000);
                //nextImg.fadeIn(settings.galltime);

                //
                //$(settings.gallthumb).removeClass('active');
                //$(this).addClass('active');
                //$(settings.gallcontent).find('img').stop(true,true).animate({opacity: 0.0}, settings.galltime).hide();
                //
                //var img_attr = $(this).find('img').attr("id"),
                //    image_id = img_attr.replace('thumb_', '');
                //
                //$('.image_' + image_id + '').stop(true,true).fadeIn(settings.galltime);
                return false;

            });

        });

    };

})(jQuery, window, document);