$( document ).ready(function() {
   $('.standart-select').ikSelect({
           autoWidth: false,
           ddFullWidth: false
   });

    $('.slide').carousel();

    $('.collapse').collapse();

    $( ".showcoupon" ).on( "click", function() {
         $( this ).toggleClass('focus');
    });
});