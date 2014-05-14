$(window).load(function() {
    var wh = $(window).height();
    var dwh = wh - 90;
    $('.navbar-collapse').css('max-height', dwh + 'px');



    $(window).resize(function() {
        var wh = $(window).height();
        var dwh = wh - 90;
        $('.navbar-collapse').css('max-height', dwh + 'px');
    });

    $('.open-calendar').on('click', function(){
        $('.b_calendar').toggle();
    });

});

$('.match-wrapper').on('click', '.navbar-bottom a',  function() {
    var address=$(this).attr('id');
    $('.match-wrapper').load("match_details_"+address+".html #match-"+address);
});

$('.b_calendar_wrapper').on('click', '.b_calendar_header a',  function() {
    var address1=$(this).attr('id');
    $('.b_calendar_wrapper').load("monthes.html .b_calendar#"+address1);
});

$(document).ready(function() {

    // lets push in a viewport
    var vpw = (screen.width>=768)?'980':'device-width';
    $('head').prepend('<meta name="viewport" content="width='+vpw+', initial-scale=1.0, user-scalable=yes" />');

});
