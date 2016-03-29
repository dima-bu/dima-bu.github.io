
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

    var sliderPrice = document.getElementById('slider-price'),
        lowerValue = document.getElementById('slider-price-lower'),
        upperValue = document.getElementById('slider-price-upper');

    noUiSlider.create(sliderPrice, {
        start: [500, 100000],
        connect: true,
        step: 10,
        range: {
            'min': 000,
            'max': 100000
        },
        format: wNumb({
            decimals: 0
        })
    });

    sliderPrice.noUiSlider.on('update', function ( values, handle ) {
        if ( !handle ) {
            lowerValue.innerHTML = values[handle];
        } else {
            upperValue.innerHTML = values[handle];
        }
    });


    //$('#slider-price').Link('lower').to($('#slider-price-lower'));
    //$('#slider-price').Link('upper').to($('#slider-price-upper'));




});