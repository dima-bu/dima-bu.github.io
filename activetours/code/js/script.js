
$(document).ready(function() {

    $('.datepicker').pickadate({
            close: 0
        }
    );


    /*days count*/

    $('.g_input.-count').on('focus', function() {
        firstval =  $(this).val();
        $(this).val('');
    });

    $('.g_input.-count').on('blur', function(){
            if  ( ($.isNumeric($(this).val()) && ($(this).val()) > 0)  === true ){
                console.log('yes');
            } else {
                $(this).val(firstval);
            }
    });

    $('.js-plus-count').on('click', function(){
        var $input = $(this).parents('.plus-minus').find('.g_input');
        $input.val(parseInt($input.val()) + 1);
        if ($input.val() <= 1) { $input.val(1) }
        else {
            $input.change();
        }

        return false;
    });

    $('.js-minus-count').on('click', function(){
        var $input = $(this).parents('.plus-minus').find('.g_input');
        $input.val(parseInt($input.val()) - 1);
        if ($input.val() <= 1) { $input.val(1) }
        else {
            $input.change();
        }
        return false;
    });


    /*region*/

    $('.js-region').on('click', function(){
        var parentlist = $(this).parents('.tour-list');

        if (parentlist.find('.js-all-region').hasClass( 'checked')) {
            allcheck = true;
        } else { allcheck = false;}

        if ($(this).hasClass( 'checked')) {
            thischeck = true;
        } else {thischeck = false;}


        $(this).toggleClass('checked');
        parentlist.find('.js-all-region').removeClass('checked');


        var regiontext = $(this).find('.tour-list-text').text();
        var regionid = $(this).find('.tour-list-text').attr('regionid');

        if (thischeck === false) {
            $('.selected-regions-list').append("<span id=" + regionid + ">" + regiontext + "<i class='small-del js-delete-item icon'>x</i></span>");
        } else
        {
            $('.selected-regions-list').find('#'+regionid).remove();
        }

        DeleteItem();
    });

    $('.js-all-region').on('click', function() {

        var parentlist = $(this).parents('.tour-list');

        if ($(this).hasClass( 'checked')) { allcheck = true; }
        else { allcheck = false; }

        if (allcheck === false) {
            parentlist.find('.js-region').addClass('checked');
            $(this).addClass('checked');

            parentlist.find('.js-region').each(function () {
                var regionid = $(this).find('.tour-list-text').attr('regionid');
                $('.selected-regions-list').find('#'+regionid).remove();
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
                $('.selected-regions-list').find('#'+regionid).remove();
            });
        }

        DeleteItem();

    });


    /*type*/

    $('.js-type').on('click', function(){
        var parentlist = $(this).parents('.tour-list');

        if (parentlist.find('.js-all-type').hasClass( 'checked')) {
            allcheck = true;
        } else { allcheck = false;}

        if ($(this).hasClass( 'checked')) {
            thischeck = true;
        } else {thischeck = false;}


        $(this).toggleClass('checked');
        parentlist.find('.js-all-type').removeClass('checked');


        var typetext = $(this).find('.tour-list-text').text();
        var typeid = $(this).find('.tour-list-text').attr('typeid');

        if (thischeck === false) {
            $('.selected-tours-list').append("<span id=" + typeid + ">" + typetext + "<i class='small-del js-delete-item icon'>x</i></span>");
        } else
        {
            $('.selected-tours-list').find('#'+typeid).remove();
        }

        DeleteItem();

    });

    var allcheck = false;

    $('.js-all-type').on('click', function() {

        var parentlist = $(this).parents('.tour-list');

        if ($(this).hasClass( 'checked')) { allcheck = true; }
        else { allcheck = false; }

        if (allcheck === false) {
            parentlist.find('.js-type').addClass('checked');
            $(this).addClass('checked');

            parentlist.find('.js-type').each(function () {
                var typeid = $(this).find('.tour-list-text').attr('typeid');
                $('.selected-tours-list').find('#'+typeid).remove();
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
                $('.selected-tours-list').find('#'+typeid).remove();
            });
        }

        DeleteItem();
    });

    $('.js-clear-all-type').on('click', function() {
        $('.js-type').removeClass('checked');
        $('.js-all-type').removeClass('checked');
        $('.selected-tours-list span').remove();
    });

    $('.js-clear-all-region').on('click', function() {
        $('.js-region').removeClass('checked');
        $('.js-all-region').removeClass('checked');
        $('.selected-regions-list span').remove();
    });


    $('.js-open-select-type').on('click', function() {
        $('.select-type').show();
    });

    $('.js-close-select-type').on('click', function() {
        $('.select-type').hide();
    });

    $('.js-open-select-region').on('click', function() {
        $('.select-region').show();
    });

    $('.js-close-select-region').on('click', function() {
        $('.select-region').hide();
    });


    $(document).click(function(event) {
        if ($(event.target).closest(".search-form").length) return;
        $('.select-region').hide();
        $('.select-type').hide();
        event.stopPropagation();
    });



    $('.js-select-regions').on('click', function() {
        $('.js-open-select-region.g_input').find('.selected-regions-list').remove();
        $('.selected-regions-list').clone().appendTo('.js-open-select-region.g_input');
        $('.select-region').hide();
    });

    $('.js-select-tours').on('click', function() {
        $('.js-open-select-type.g_input').find('.selected-tours-list').remove();
        $('.selected-tours-list').clone().appendTo('.js-open-select-type.g_input');
        $('.select-type').hide();
    });

    function DeleteItem() {
        $('.js-delete-item').on('click', function() {
            $(this).parent('span').remove();
            var id = $(this).parent('span').attr('id');
            $('body').find('span[regionid='+id+']').parent().removeClass('checked');
            $('body').find('span[typeid='+id+']').parent().removeClass('checked');
        });
    };

    /*scroll to top search panel*/

    $('.js-open-select-region').on('click', function() {
        $('html, body').animate({
            scrollTop: ($(".search-form").offset().top-10)
        }, 200);
    });

    $('.js-open-select-type').on('click', function() {
        $('html, body').animate({
            scrollTop: ($(".search-form").offset().top-10)
        }, 400);
    });

    /*switch btn*/

    $('.js-switch-btn').on('click', function() {
        if ($(this).hasClass('active')) {
        }
        else {
            $(this).parent().find('.js-switch-btn').removeClass('active');
            $(this).addClass('active');
        }

    });


});
