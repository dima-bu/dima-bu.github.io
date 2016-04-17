
$(document).ready(function() {


    // модалка выбора города
    $('.js-show-city-list').click(function () {
        $('#city-list').toggle();
    });

    // телефонная маска
    $(".js-phone-mask").mask("+7(999) 999-99-99");

    // галлерея продукта
    $('#gallery').simplegallery({
        galltime : 400, // transition delay
        gallcontent: '.gallery-content',
        gallthumbnail: '.thumbnail',
        gallthumb: '.thumb'
    });

    $('#gallery-modal-product').simplegallery({
        galltime : 400, // transition delay
        gallcontent: '.gallery-content',
        gallthumbnail: '.thumbnail',
        gallthumb: '.thumb'
    });


    // выбор ценового диапозона

    var sliderPrice = document.getElementById('slider-price'),
        lowerValue = document.getElementById('slider-price-lower'),
        upperValue = document.getElementById('slider-price-upper');


    if (sliderPrice) {
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
                lowerValue.value = values[handle];
            } else {
                upperValue.value = values[handle];
            }
        });

        lowerValue.addEventListener('input', function(e){
            sliderPrice.noUiSlider.set([e.target.value, null]);
        });

        upperValue.addEventListener('input', function(e){
            sliderPrice.noUiSlider.set([null, e.target.value]);
        });


    }


    // аккордион в сайдбаре фильтра на страницке каталога
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
        persist: false
    });


    // выезжающее меню на странице каталога в мобильной версии
    $('#show-aside-filter').click(function (e) {
        $('#filters-aside').addClass('open');
        e.preventDefault();
    });

    $('#hide-aside-filter').click(function (e) {
        $('#filters-aside').removeClass('open');
        e.preventDefault();
    });


    // печать страницы
    $('#js-print').click(function () {
        window.print() ;
    });


    //смена формы на форму спасибо, сюда еще нужно будет вставить аякс запрос
    $('#js-send-phone').click(function () {
        $('#js-phone-form').hide();
        $('#js-thank-you').show();
    });


    // табы на странице продукта
    $('.js-show-tab').click(function (e) {
        $('.js-show-tab').removeClass('active');
        $(this).addClass('active');

        var prefix = e.target.dataset.tablink;
        $('.product-tab_content').hide();
        $('#'+prefix+ '-content').show();
    });


    // добавление свайпа в карусель
    //$(".carousel").swipe( {
    //    //Generic swipe handler for all directions
    //    swipeLeft:function(event, direction, distance, duration, fingerCount) {
    //        $(this).parent().carousel('prev');
    //    },
    //    swipeRight: function() {
    //        $(this).parent().carousel('next');
    //    },
    //    //Default is 75px, set to 0 for demo so any distance triggers swipe
    //    threshold:0
    //});


    $(".carousel").swiperight(function() {
        $(this).carousel('prev');
    });

    $(".carousel").swipeleft(function() {
        $(this).carousel('next');
    });

    $('.js-zoom').zoom({ touch: true});

});