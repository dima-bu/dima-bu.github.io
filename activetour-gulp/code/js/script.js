$(document).ready(function () {


    $('.datepicker').pickadate({
            close: 0
        }
    );


    var addStatus=false;



    /*days count*/

    $('.g_input.-count').on('focus', function () {
        firstval = $(this).val();
        $(this).val('');
    });

    $('.g_input.-count').on('blur', function () {
        if (($.isNumeric($(this).val()) && ($(this).val()) > 0) === true) {
            console.log('yes');
        } else {
            $(this).val(firstval);
        }
    });

    $('.js-plus-count').on('click', function () {
        var $input = $(this).parents('.plus-minus').find('.g_input');
        $input.val(parseInt($input.val()) + 1);
        if ($input.val() <= 1) {
            $input.val(1)
        }
        else {
            $input.change();
        }

        return false;
    });

    $('.js-minus-count').on('click', function () {
        var $input = $(this).parents('.plus-minus').find('.g_input');
        $input.val(parseInt($input.val()) - 1);
        if ($input.val() <= 1) {
            $input.val(1)
        }
        else {
            $input.change();
        }
        return false;
    });


    /*region*/

    $('.js-region').on('click', function () {
        var parentlist = $(this).parents('.tour-list');

        if (parentlist.find('.js-all-region').hasClass('checked')) {
            allcheck = true;
        } else {
            allcheck = false;
        }

        if ($(this).hasClass('checked')) {
            thischeck = true;
        } else {
            thischeck = false;
        }


        $(this).toggleClass('checked');
        parentlist.find('.js-all-region').removeClass('checked');


        var regiontext = $(this).find('.tour-list-text').text();
        var regionid = $(this).find('.tour-list-text').attr('regionid');

        if (thischeck === false) {
            $('.selected-regions-list').append("<span id=" + regionid + ">" + regiontext + "<i class='small-del js-delete-item icon'>x</i></span>");
        } else {
            $('.selected-regions-list').find('#' + regionid).remove();
        }

        DeleteItem();
    });

    $('.js-one-region').on('click', function () {
        var parentlist = $(this).parents('.tour-list');

        //if (parentlist.find('.js-all-region').hasClass('checked')) {
        //    allcheck = true;
        //} else {
        //    allcheck = false;
        //}

        //if ($(this).hasClass('checked')) {
        //    thischeck = true;
        //} else {
        //    thischeck = false;
        //}
        //
        //
        //$(this).toggleClass('checked');
        //parentlist.find('.js-all-region').removeClass('checked');
        //
        //
        //var regiontext = $(this).find('.tour-list-text').text();
        //var regionid = $(this).find('.tour-list-text').attr('regionid');
        //
        //if (thischeck === false) {
        //    $('.selected-regions-list').append("<span id=" + regionid + ">" + regiontext + "<i class='small-del js-delete-item icon'>x</i></span>");
        //} else {
        //    $('.selected-regions-list').find('#' + regionid).remove();
        //}
        //

        var parenttext = parentlist.find('.js-main-region').find('.tour-list-text').text();
        var regiontext = $(this).find('.tour-list-text').text();
        var regionid = $(this).find('.tour-list-text').attr('regionid');

        var separator = ', ';

        if ( parenttext == '') {
            separator = '';
        } ;


        $('.selected-regions-list').empty();
        $('.selected-regions-list').append("<span id=" + regionid + ">" + parenttext + separator + regiontext + "<i class='small-del js-delete-item icon'>x</i></span>");

        $('.js-one-region').removeClass('checked');
        $('.js-main-region').removeClass('checked');

        $(this).addClass('checked');
        $('.js-custom-region').hide();

        DeleteItem();
    });


    $('.js-main-region').on('click', function () {
        var mainregiontext = $(this).find('.tour-list-text').text();
        var regionid = $(this).find('.tour-list-text').attr('regionid');

        $('.selected-regions-list').empty();
        $('.selected-regions-list').append("<span id=" + regionid + ">" + mainregiontext + "<i class='small-del js-delete-item icon'>x</i></span>");

        $('.js-one-region').removeClass('checked');
        $('.js-main-region').removeClass('checked');
        $(this).addClass('checked');

        $('.js-custom-region').show();

        DeleteItem();


    });


    $('.js-all-region').on('click', function () {

        var parentlist = $(this).parents('.tour-list');

        if ($(this).hasClass('checked')) {
            allcheck = true;
        }
        else {
            allcheck = false;
        }

        if (allcheck === false) {
            parentlist.find('.js-region').addClass('checked');
            $(this).addClass('checked');

            parentlist.find('.js-region').each(function () {
                var regionid = $(this).find('.tour-list-text').attr('regionid');
                $('.selected-regions-list').find('#' + regionid).remove();
            });

            parentlist.find('.js-region').each(function () {
                var regiontext = $(this).find('.tour-list-text').text();
                var regionid = $(this).find('.tour-list-text').attr('regionid');
                $('.selected-regions-list').append("<span id=" + regionid + ">" + regiontext + "<i class='small-del js-delete-item icon'>x</i></span>");
            });
        }
        else {
            parentlist.find('.js-region').removeClass('checked');
            $(this).removeClass('checked');
            parentlist.find('.js-region').each(function () {
                var regionid = $(this).find('.tour-list-text').attr('regionid');
                $('.selected-regions-list').find('#' + regionid).remove();
            });
        }

        DeleteItem();

    });


    /*type*/

    $('.js-type').on('click', function () {
        var parentlist = $(this).parents('.tour-list');

        if (parentlist.find('.js-all-type').hasClass('checked')) {
            allcheck = true;
        } else {
            allcheck = false;
        }

        if ($(this).hasClass('checked')) {
            thischeck = true;
        } else {
            thischeck = false;
        }


        $(this).toggleClass('checked');
        parentlist.find('.js-all-type').removeClass('checked');


        var typetext = $(this).find('.tour-list-text').text();
        var typeid = $(this).find('.tour-list-text').attr('typeid');

        if (thischeck === false) {
            $('.selected-tours-list').append("<span id=" + typeid + ">" + typetext + "<i class='small-del js-delete-item icon'>x</i></span>");
        } else {
            $('.selected-tours-list').find('#' + typeid).remove();
        }

        DeleteItem();

    });

    var allcheck = false;

    $('.js-all-type').on('click', function () {

        var parentlist = $(this).parents('.tour-list');

        if ($(this).hasClass('checked')) {
            allcheck = true;
        }
        else {
            allcheck = false;
        }

        if (allcheck === false) {
            parentlist.find('.js-type').addClass('checked');
            $(this).addClass('checked');

            parentlist.find('.js-type').each(function () {
                var typeid = $(this).find('.tour-list-text').attr('typeid');
                $('.selected-tours-list').find('#' + typeid).remove();
            });

            parentlist.find('.js-type').each(function () {
                var typetext = $(this).find('.tour-list-text').text();
                var typeid = $(this).find('.tour-list-text').attr('typeid');
                $('.selected-tours-list').append("<span id=" + typeid + ">" + typetext + "<i class='small-del js-delete-item icon'>x</i></span>");
            });
        }
        else {
            parentlist.find('.js-type').removeClass('checked');
            $(this).removeClass('checked');
            parentlist.find('.js-type').each(function () {
                var typeid = $(this).find('.tour-list-text').attr('typeid');
                $('.selected-tours-list').find('#' + typeid).remove();
            });
        }

        DeleteItem();
    });

    $('.js-clear-all-type').on('click', function () {
        $('.js-type').removeClass('checked');
        $('.js-all-type').removeClass('checked');
        $('.selected-tours-list span').remove();

    });

    $('.js-clear-all-region').on('click', function () {
        $('.js-region').removeClass('checked');
        $('.js-all-region').removeClass('checked');
        $('.js-main-region').removeClass('checked');

        $('.selected-regions-list span').remove();
        $('.js-custom-region').hide();
        $('.js-custom-region').val('');
    });


    $('.js-open-select-type').on('click', function () {
        $('.select-type').show();
    });

    $('.js-close-select-type').on('click', function () {
        $('.select-type').hide();
    });

    $('.js-open-select-region').on('click', function () {
        $('.select-region').show();
    });

    $('.js-close-select-region').on('click', function () {
        $('.select-region').hide();
    });


    //$(document).click(function (event) {
    //    if ($(event.target).closest(".search-form").length) return;
    //    $('.select-region').hide();
    //    $('.select-type').hide();
    //    event.stopPropagation();
    //});


    $('.js-select-regions').on('click', function () {

        var customval = $('.js-custom-region').val();

        $('.js-open-select-region.g_input').find('.selected-regions-list').remove();

        var currentVal='';
        $('.selected-regions-list span').each(function (){
            if (currentVal=='') {
                currentVal = $(this).attr('id');
            } else {
                currentVal = currentVal +',' + $(this).attr('id');
            }

        });



        if (customval!=='') {
            $('.selected-regions-list span').append(', '+ customval);
            $('.selected-regions-list').clone().appendTo('.js-open-select-region.g_input');
            if (currentVal=='') {
                currentVal = $(this).attr('id');
            } else {
                currentVal = currentVal +',' + $(this).attr('id');
            }
        } else {
            $('.selected-regions-list').clone().appendTo('.js-open-select-region.g_input');
        }
        $('.open-select-region_hidden').val(currentVal);
        $('.select-region').hide();

    });

    $('.js-select-tours').on('click', function () {
        $('.js-open-select-type.g_input').find('.selected-tours-list').remove();

        var currentVal='';
        $('.selected-tours-list span').each(function (){
            if (currentVal=='') {
                currentVal = $(this).attr('id');
            } else {
                currentVal = currentVal +',' + $(this).attr('id');
            }
        });
        $('.open-select-type_hidden').val(currentVal);

        $('.selected-tours-list').clone().appendTo('.js-open-select-type.g_input');
        $('.select-type').hide();
    });

    function DeleteItem() {
        $('.js-delete-item').on('click', function () {
            $(this).parent('span').remove();
            var id = $(this).parent('span').attr('id');
            $('body').find('span[regionid=' + id + ']').parent().removeClass('checked');
            $('body').find('span[typeid=' + id + ']').parent().removeClass('checked');
            $('.js-custom-region').val('');
            $('.js-custom-region').hide();
        });
    };


    /*scroll to top search panel*/

    $('.js-open-select-region').on('click', function () {
        $('html, body').animate({
            scrollTop: ($(".search-form").offset().top - 10)
        }, 200);
    });

    $('.js-open-select-type').on('click', function () {
        $('html, body').animate({
            scrollTop: ($(".search-form").offset().top - 10)
        }, 400);
    });

    /*switch btn*/

    $('.js-switch-btn').on('click', function () {
        if ($(this).hasClass('active')) {
        }
        else {
            $(this).parent().find('.js-switch-btn').removeClass('active');
            $(this).addClass('active');
        }

    });

    $('.js-switch-btn-item').on('click', function () {
        if ($(this).hasClass('active')) {
        }
        else {
            $(this).parent().find('.js-switch-btn-item').removeClass('active');
            $(this).addClass('active');
            $(this).parents('.info-item').toggleClass('disabled');
        }

    });

    /**/


    Math.max.apply(Math, $(".js-review-body").map(function(){
        $(".js-review-body").css("height", $(this).height());
    }).get());

    /*equipment toggle*/

    $('.js-toggle-equipment').on('click', function () {
        $('.equipment-body_inner').slideToggle();
        $(this).toggleClass('open');
    });

    /*youtube*/

    var $allVideos = $("iframe[src^='http://www.youtube.com']"),

    // The element that is fluid width
        $fluidEl = $("body");

// Figure out and save aspect ratio for each video
    $allVideos.each(function () {

        $(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });



// When the window is resized
    $(window).resize(function () {

        $(".js-review-body").css("height","");

        Math.max.apply(Math, $(".js-review-body").map(function(){

            $(".js-review-body").css("height", $(this).height());

        }).get());

        var newWidth = $fluidEl.width();

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function () {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

        });

// Kick off one resize to fix all videos on page load
    }).resize();




    var $carousel = $('#js-reviews-carusel'),
        $carouselItems = $('.item', $carousel);

    $carousel.on('slid.bs.carousel', function (e) {
        $carouselItems.removeClass('prev next');
        var $active = $(e.relatedTarget);
        $active.next().addClass('next');
        $active.prev().addClass('prev');
    })




    /*Man count*/


    $('.js-man').on('mouseover', function(){
        $('.js-man').removeClass('man-yactive');
        var thisis = $(this);
        thisis.prev().addClass('man-yactive');
        thisis.prev().prev().addClass('man-yactive');
        thisis.prev().prev().prev().addClass('man-yactive');
        thisis.addClass('man-yactive');
    });

    $('.mans-wrapper').on('mouseout', function(){

        $('.js-man').not('.const').removeClass('man-yactive');
        $('.js-man.const').addClass('man-yactive');

    });


    $('.js-man').on('click', function() {
        $('.js-man').removeClass('const');
        $(this).addClass('const');
        $(this).prev().addClass('const');
        $(this).prev().prev().addClass('const');
        $(this).prev().prev().prev().addClass('const');

    });


    /*popup*/


    $('.js-show-guide').on('click', function(){
        $('.pop-up_guide').show();
    });


    $('.js-show-manager').on('click', function(){
        $('.pop-up_manager').show();
    });


    $('.js-popup-close').on('click', function(){
        $(this).parents('.pop-up_wrapper').hide();
    });


    $('.pop-up_wrapper').click(function (event) {
         if ($(event.target).closest(".pop-up").length) return;
        $(this).hide();
        event.stopPropagation();
    });


//    $('.js-active').on('click', function(){
//        var wrapper = $(this).parent('.count-changer');
//        var elems = wrapper.children('label');
//        elems.removeClass('hide');
//        $(this).removeClass('js-active');
//    });

    var shown = 0;

    $('.count-changer label').on('click', function(){
        console.log(shown);

        if ( shown === 0) {
            $('.count-changer label.label_md').removeClass('hide');
            $(this).removeClass('js-active');
            $(this).find('input').removeAttr('checked');
            shown = 1;
            return false
        } else { if ( shown === 1) {

            $('.count-changer label.label_md').removeClass('js-active').addClass('hide');
            $(this).addClass('js-active').removeClass('hide');
            $(this).find('input').attr('checked');
            shown = 0;
            return false
        }

        }
    })


    /*input file*/


//        var a = $(".g_file_wrapper"), b = a.find(".g_file"), c = a.find("button"), d = a.find(".g_file-text");
//
//        c.focus(function () {
//            b.focus()
//        }), b.focus(function () {
//            a.addClass("focus")
//        }).blur(function () {
//            a.removeClass("focus")
//        });

        var e = window.File && window.FileReader && window.FileList && window.Blob ? !0 : !1;
            $('.g_file').change(function () {
            var a = $(this).parents('.g_file_wrapper');
            var c =  a.find("button");
            var d =  a.find(".g_file-text");

            a = e && $(this)[0].files[0] ? $(this)[0].files[0].name : $(this).val().replace("C:\\fakepath\\", ""), a.length && (d.is(":visible") ? (d.text(a), c.text("Выбрать")) : c.text(a), $("#go").removeAttr("disabled"))
        }).change();

    /*popup-select-icons*/

    $('.js-change-icon').on('click', function(){
        $('.popup-select-icons').show();
        $(this).parents('.info-item').find('.almost-sqr-wrapper').addClass('tobe-changed');
        return false;
    });

     $(document).click(function (event) {
        if ($(event.target).closest(".popup-select-icons").length) return;
        $('.popup-select-icons').hide();
        event.stopPropagation();
    });

    $('.popup-select-icons .almost-sqr-wrapper').on('click', function(){
        var Icon = $(this).children();
        $('.tobe-changed').empty();
        Icon.clone().appendTo('.tobe-changed');
        $('.tobe-changed').removeClass('tobe-changed');
        $('.popup-select-icons').hide();
    });


    /*add enter item*/

    $('.js-add-item_btn').on('click', function(){
        var AddItemWrapper = $(this).parents('.js-add-item_wrapper'),
            AddItemInput = AddItemWrapper.find('.js-add-item_input'),
            AddItemBox = AddItemWrapper.find('.js-add-item_box'),
            AddItemValue = AddItemInput.val(),
            AddItemArray = AddItemValue.split(',');

        for(var i=0;i<AddItemArray.length;i++){
            AddItemBox.append( '<label class="label_sm -inline"><div class="checking_item  -white-yellow checking_item-inline"><input type="checkbox" id="alias-'+i+'" class="checking_input"><div class="checking_input-pseudo-wrapper"><div class="checking_input-pseudo"><i class="white-check icon"></i></div> </div></div>'+AddItemArray[i]+'</label>');
        }

        AddItemInput.val('');

    });

    $('select.g_select').ikSelect({
        autoWidth: false,
        ddFullWidth: false,
        equalWidths: true,
        ddMaxHeight: 300
    });


    $('#to-about-tour').on('click', function(){
        console.log('sdfsdf');
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $('#to-about-tour').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $('#to-includes').on('click', function(){
        $('html, body').animate({
            scrollTop: ($("#includes").offset().top - 70)
        }, 1000);
    });

    $('#to-photo').on('click', function(){
        $('html, body').animate({
            scrollTop: ($("#photo-section").offset().top - 20)
        }, 1000);
    });

    $('#to-days').on('click', function(){
        $('html, body').animate({
            scrollTop: ($("#days-section").offset().top - 50)
        }, 1000);
    });

    $('#to-reviews').on('click', function(){
        $('html, body').animate({
            scrollTop: ($("#reviews-section").offset().top - 50)
        }, 1000);
    });

    $('.to-reserve').on('click', function(e){

        $('html, body').animate({
            scrollTop: ($("#reserve-section").offset().top - 20)
        }, 1000);
        e.preventDefault();
    });

    $('.js-reg').on('click', function(){

        $('.js-login-title').hide();
        $('.js-reg-title').show();
        $('.js-log-reg-buttons').hide();
        $('.js-reg-options').show();
    })

    $('#agencytype').on('change', function(){
        $('.js-agency-wrapper').show();
        $('.js-guide-wrapper').hide();
        $('.js-save-reg-btn').show();
    });

    $('#guidetype').on('change', function(){
        $('.js-agency-wrapper').hide();
        $('.js-guide-wrapper').show();
        $('.js-save-reg-btn').show();
    });

    $('.js-cabinet-toggle').on('click', function(){
        $('.js-cabinet').toggle();
    });

    $('.js-print-page').on('click', function(){
            window.print() ;
    });


    $("#new_tour").validate({
        ignore: "input[type='text']:hidden",
        errorPlacement: function(error, element) {
            if (element.attr("type") == "file")
            {
                error.appendTo(element.parent().parent());
                //error.insertAfter(".g_file_wrapper");
            }
            else
            {
                error.insertAfter(element);
            }
        },
        rules: {

            'tour[title]': {
                required: true
            },

            'tour[main_picture]': {
                required: true
            },

            'tour[price]': {
                    required: true,
                    number: true
            },

            'tour[region_id]': {
                required: true
            },

            'tour[activity_ids]': {
                required: true
            },

            'tour[description]': {
                required: true
            },

            'tour[description_image_1]': {
                required: true
            },

            'tour[description_image_2]': {
                required: true
            },

            'tour[description_title]': {
                required: true
            }
        },
        messages: {
            'tour[price]': 'Не заполнена цена',
            'tour[title]': 'У тура должно быть название',
            'tour[region_id]': 'Выберите регион в котором будет проходить тур',
            'tour[activity_ids]': 'Выберите один или несколько видов активности'
        }

   });






});
