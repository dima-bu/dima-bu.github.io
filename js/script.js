$(window).load(function() {
    var wh = $(window).height();
    var dwh = wh - 100;
    $('.navbar-collapse').css('max-height', dwh + 'px');



    $(window).resize(function() {
        var wh = $(window).height();
        var dwh = wh - 90;
        $('.navbar-collapse').css('max-height', dwh + 'px');
    });

    $('.navbar_calendar_link').on('click', function(){
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