$( document ).ready(function() {

    $('.navbar-toggle').on( "click", function() {
        $('.navbar-collapse').collapse('toggle');
    });

    $('i.fatooltip').tooltip();

    $('.goods-price.-new').on( "click", function() {
        $(this).next().collapse('toggle')
    });

});

