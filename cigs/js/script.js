
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

    $(".product_img_gallery_item img").click(function() {
        // see if same thumb is being clicked
        if ($(this).parent('.product_img_gallery_item').hasClass("active")) { return; }

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
        $(".product_img_gallery_item").removeClass("active");
        $(this).parent('.product_img_gallery_item').addClass("active");

// when page loads simulate a "click" on the first image

    }).filter(":first").click();

    /*END GALLERY*/


});
