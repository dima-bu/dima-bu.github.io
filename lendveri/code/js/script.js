
$(document).ready(function() {

    $('.js-show-city-list').click(function () {
        $('#city-list').toggle();
    });

    $(".js-phone-mask").mask("+7(999) 999-99-99");

    $('#gallery').simplegallery({
        galltime : 400, // transition delay
        gallcontent: '.gallery-content',
        gallthumbnail: '.thumbnail',
        gallthumb: '.thumb'
    });

    //var gallery = new $.ThumbnailGallery($('#gallery'), {
    //    thumbImages: 'img/thumbs/thumb',
    //    smallImages: 'img/large/image',
    //    largeImages: 'img/large/image',
    //    count: 3,
    //    thumbImageType: 'jpg',
    //    imageType: 'jpg',
    //    breakpoint: 970,
    //    shadowStrength: 1
    //});


});