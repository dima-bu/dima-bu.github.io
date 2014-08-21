
$(document).ready(function() {

    $('.stars').raty({
            starOff     : 'img/star-off.png',
            starOn      : 'img/star-on.png'
    });

    $('.standart-select.-nicotine').ddslick({
        width: 126
    });

    $('.standart-select-img.-flavour').ddslick(
        {
            width: 282
    });


    $('.standart-select.-time').ddslick({
        width: 96
    });

    $('.standart-select.-date-day').ddslick({
        width: 130
    });
    $('.standart-select.-date-month').ddslick({
        width: 130
    });
    $('.standart-select.-date-year').ddslick({
        width: 130
    });

    $('.standart-select.-country').ddslick({
        width: 282
    });

    $('.standart-select.-accu').ddslick({
        width: 282
    });

    $('.standart-select.-quantity').ddslick({
        width: 126
    });

    $('.standart-select.-bewertung').ddslick({
        width: 385
    });

    $('.quantity-up').on( "click", function() {
        $(this).parent('.quantity-input_wrapper').find('input').val( function(i, oldval) {
            return ++oldval;
        });
    });

    $('.quantity-drop').on( "click", function() {

        $(this).parent('.quantity-input_wrapper').find('input').val( function(i, oldval) {
            if (oldval > 0) {
                return --oldval;
            }

            else {
                return 0;
            }
        });
    });

    /*GALLERY*/


    $(".product_img_gallery .next-img").on( "click", function(e) {
        e.preventDefault();
        var wrap= $(this).parents('.product_img_gallery');
//        wrap.addClass('red');

        var index = wrap.find('.active');
        var column = index.next('.column').index();
//        console.log(column);
        if (column > 0) {
            index.next('.column').find('img').trigger('click');
        }
        else {
            wrap.find('.column:first img').trigger('click');
        }

    });

    $(".product_img_gallery .prev-img").on( "click", function(e) {
        e.preventDefault();
        var wrap= $(this).parents('.product_img_gallery');
        var column = index.next('.column').index();
        console.log(column);

        var index = wrap.find('.active');
        index.prev('.column').find('img').trigger('click');

    });

    $(".product_img_gallery_item img").click(function() {
        // see if same thumb is being clicked
        if ($(this).parent('.product_img_gallery_item').parent('.column').hasClass("active")) { return; }

        // calclulate large image's  based on the thumbnail URL (flickr specific)
        var url = $(this).attr("alt");


        var img = new Image();

        // call this function after it's loaded
        img.onload = function() {



            // change the image
            $("#product_img_big").attr("src", url);

        };

        // begin loading the image from www.flickr.com
        img.src = url;

        // activate item
        $(".column").removeClass("active");
        $(this).parent('.product_img_gallery_item').parent('.column').addClass("active");

// when page loads simulate a "click" on the first image

    }).filter(":first").click();

    /*END GALLERY*/


});
