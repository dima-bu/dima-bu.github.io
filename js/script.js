$(window).load(function() {
    var wh = $(window).height();
    var dwh = wh - 100;
    $('.navbar-collapse').css('max-height', dwh + 'px');

    $('.navbar-bottom a').click(
        function(){
            $.ajax({
                    url: 'match_details_lineups.html',
                    success: function(){
                        var attr1 = $(this).attr('id');
                        alert(attr1, 'Load was performed.');
                    }

                });
        });

    $(window).resize(function() {
        var wh = $(window).height();
        var dwh = wh - 90;
        $('.navbar-collapse').css('max-height', dwh + 'px');
    });
});
