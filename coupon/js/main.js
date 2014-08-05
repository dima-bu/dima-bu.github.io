$( document ).ready(function() {
   $('.standart-select').ikSelect({
           autoWidth: false,
           ddFullWidth: false
   });

    $( ".showcoupon" ).on( "click", function() {
        $( this ).addClass('focus');
    });

    $( ".deal-categories_item" ).on( "click", function() {
        var $checkbox = $(this).find(':checkbox');
        $( this ).toggleClass('active');
        $checkbox.attr('checked', !$checkbox.attr('checked'));
    });

    $( ".deal-simple-checkbox" ).on( "click", function() {
        var $checkbox = $(this).find(':checkbox');
        $( this ).toggleClass('active');
        $checkbox.attr('checked', !$checkbox.attr('checked'));
    });



//    $('.slide').carousel();
//
//    $('.collapse').collapse();


});