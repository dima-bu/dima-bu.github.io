
$(document).ready(function() {

    /*price slider*/


    $("#slider").noUiSlider({
        start: [5000, 40000],
        connect: true,
        step: 1000,
        range: {
            'min': 000,
            'max': 80000
        },
        format: wNumb({
            decimals: 0
        })
    });

    $('#slider').Link('lower').to($('#input-lower'));
    $('#slider').Link('upper').to($('#input-upper'));




});
