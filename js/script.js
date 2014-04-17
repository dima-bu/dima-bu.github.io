$(document).ready(function() {
    var wh = $(window).height();
    var dh = $(window).outerHeight;
    var dwh = wh - 90;
    $('.navbar-collapse').css('max-height', dwh + 'px');
    alert(dh);
    $(window).resize(function() {
        var wh = $(window).height();
         var dh = $(window).outerHeight;
        var dwh = wh - 90;
        $('.navbar-collapse').css('max-height', dwh + 'px');
          alert(dh);
    });
});
