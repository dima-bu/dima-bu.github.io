$( document ).ready(function() {
   $('.standart-select').ikSelect({
           autoWidth: false,
           ddFullWidth: false
   });

    $( ".showcoupon" ).on( "click", function() {
         $( this ).toggleClass('focus');
    });
});