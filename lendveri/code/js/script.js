
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

    $("#accordion").collapse({
        query: 'div h3',
        show: function() {
            // The context of 'this' is applied to
            // the collapsed details in a jQuery wrapper
            this.slideDown(100);
        },
        hide: function() {
            this.slideUp(100);
        },
        accordion: true,
        persist: true
    });

    $('#show-aside-filter').click(function (e) {
        $('#filters-aside').addClass('open');
        e.preventDefault();
    });

    $('#hide-aside-filter').click(function (e) {
        $('#filters-aside').removeClass('open');
        e.preventDefault();
    });

});