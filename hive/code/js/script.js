
document.createElement('header');
document.createElement('nav');
document.createElement('section');
document.createElement('article');
document.createElement('aside');
document.createElement('footer');

$(function(){
    var wrapper = $( ".g_file_wrapper" ),
        inp = wrapper.find( ".g_file" ),
        btn = wrapper.find( "button"),
        lbl = wrapper.find( ".g_file-text" );

    btn.focus(function(){
        inp.focus()
    });
    // Crutches for the :focus style:
    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
            btn.text( "Выбрать" );
        }else
            btn.text( file_name );
    }).change();

});


$( document ).ready(function() {

    $('.js-popup-open').on('click', function(){
        var job = $(this).parents('.vacancy-item').find('h3').text();
        $('.popup').find('h3').text( job );
        $('.popup-wrapper').fadeIn('fast');
    });


    $('.js-popup-close').on('click', function(){
        $('.popup-wrapper').hide();
    });

    $('.popup-wrapper').click(function(event) {
        if ($(event.target).closest(".popup").length) return;
        $(this).hide();
        event.stopPropagation();
    });

});

