$(document).ready(function() {
    var wh = $(window).height();
    var dwh = wh - 100;
    $('.navbar-collapse').css('max-height', dwh + 'px');

    $(window).resize(function() {
        var wh = $(window).height();
        var dwh = wh - 90;
        $('.navbar-collapse').css('max-height', dwh + 'px');
    });
});
