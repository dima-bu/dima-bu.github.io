
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


    $('#more-block').click(function () {
        $('.product-page_left .thumb').removeClass('hide');
        $(this).hide();
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
        $('body').addClass('overflow');
        e.preventDefault();
    });

    $('#hide-aside-filter').click(function (e) {
        $('#filters-aside').removeClass('open');
        $('body').removeClass('overflow');
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


    $('#modalProduct').on('shown.bs.modal', function (e) {
        var rel = $("#gallery .thumb.active a").attr('rel'),
            eq = rel - 1;
        $('#modalProduct .thumb:eq('+  eq + ')').addClass('active');
    });

    $('#modalProduct').on('hidden.bs.modal', function (e) {
        var rel1 = $("#modalProduct .thumb.active a").attr('rel'),
            eq1 = rel1 - 1;

        $('#gallery .thumb:eq('+  eq1 + ')').addClass('active');
    });



    $(".carousel").swiperight(function() {
        $(this).carousel('prev');
    });

    $(".carousel").swipeleft(function() {
        $(this).carousel('next');
    });

    $('#carousel-home').slick({
        dots: true,
        dotsClass: 'carousel-indicators',
        autoplay: true,
        autoplaySpeed: 5000
    });


    $('#carousel-info').slick({
        responsive: [{
            breakpoint: 2400,
            settings: {
                slidesToShow: 4,
                arrows: false
            }

        }, {

            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                dots: true,
                dotsClass: 'carousel-indicators',
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: false
            }

        }]
    });


    $('#carousel-products-list').slick({
        responsive: [{
            breakpoint: 2400,
            settings: 'unslick'
        }, {

            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                dots: true,
                dotsClass: 'carousel-indicators',
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: false
            }

        }]
    });

    $('#carousel-products-similar').slick({
        responsive: [{
            breakpoint: 2400,
            settings: 'unslick'
        }, {

            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                dots: true,
                dotsClass: 'carousel-indicators',
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: false
            }

        }]
    });


    $('#carousel-articles').slick({
        dots: true,
        dotsClass: 'carousel-indicators',
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    });


    $('#search-btn').click(function(e) {
        $('#search-input').show();
        $('#search-btn').hide();
        $('#inputSearch').focus();
        e.preventDefault();
        e.stopPropagation();
    });

    $(document).click(function(event) {
        if(!$(event.target).closest('#search-input').length &&
            !$(event.target).is('#search-input')) {

            if($('#search-input').is(":visible")) {
                $('#search-input').hide();
                $('#search-btn').show();
            }
        }
    });

    $('#InputSearchXS').on('input', function (val) {
       if (this.value.length) {
           $('#InputSearchXSWrapper').show();
       } else {
           $('#InputSearchXSWrapper').hide();
       }

    });

    $('#inputSearchSM').on('input', function(val) {
        if (this.value.length) {
            $('#inputSearchSMWrapper').show();
        } else {
            $('#inputSearchSMWrapper').hide();
        }
    });

    $('#inputSearch').on('input', function(val) {
        if (this.value.length) {
            $('#search-result').show();
        } else {
            $('#search-result').hide();
        }
    });

    $('#js-product-colors .colors-list_item').on('click', function() {
        $('#js-product-colors .colors-list_item').removeClass('active');
        $(this).addClass('active')
    });


    //$('.js-zoom').zoom({ touch: true});

});