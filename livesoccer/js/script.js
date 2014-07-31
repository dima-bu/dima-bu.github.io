$(window).load(function() {
    var wh = $(window).height();
    var wsh = window.screen.height;
    var ww = $(window).width();



//    var dwh = wh-90;

    var dwh = (screen.width>=768)?wh-90:wsh+20;

//    alert('ww='+ww+'wh='+wh+'wsh='+wsh+'wsw='+wsh);
//    $('.navbar-collapse').css('max-height', dwh + 'px');


    $(window).resize(function() {
        var wh = $(window).height();
        var woH = $(window).outerHeight();
        var dh = $(document).height();
        var wsh = window.screen.height;
        var dwh = wh-90;
//        $('.navbar-collapse').css('max-height', dwh + 'px');
    });

    $('.open-calendar').on('click', function(){
        $('.b_calendar').toggle();
    });

    $('.navbar-toggle').on('click', function(){
        $('html, body').animate({scrollTop:0}, 'fast');
    });


    $('.navbar_cal_settings').on('click', function(){
        $('.b_settings_bubble').toggle();
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
    var insc = (screen.width>=768)?'1.0':'0.5';
    $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale='+insc+', user-scalable=yes" />');

});