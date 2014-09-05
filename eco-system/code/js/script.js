
$(document).ready(function() {


    $('.js-open-create-form').on( "click", function() {
        $('.js-create-form').show();
    });

    $('.js-close-create-form').on( "click", function() {
        $('.js-create-form').hide();
    });

    $('.js-open-offer-form').on( "click", function() {
        $('.js-offer-form').show();
    });

    $('.js-hide-offer-form').on( "click", function() {
        $('.js-offer-form').hide();
    });


    $('.g_select').ikSelect({
        autoWidth: false,
        ddFullWidth: false
    });

    var filterh = $('.filter-wrapper').innerHeight(  );
    var searchh = $('.search-form-wrapper').innerHeight(  );
    var delta = (filterh - searchh);
//    console.log(filterh,searchh, delta);
    $('.js-search-delta').css('height', delta);



    $('.js-collapse-panel').on( "click", function() {
        $(this).parents('.collapse-block').find('.collapse-panel').collapse('toggle');
        $(this).parents('.collapse-block').toggleClass('active-icon');
    });



});

$( window ).resize(function() {
    var filterh = $('.filter-wrapper').innerHeight(  );
    var searchh = $('.search-form-wrapper').innerHeight(  );
    var delta = (filterh - searchh);
    console.log(filterh,searchh, delta);
    $('.search-delata-block').css('height', delta);
});
