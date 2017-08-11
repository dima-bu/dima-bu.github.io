document.addEventListener('DOMContentLoaded', function(){
  var paginationItem = $('.pagination-item');

  var sinTitle1 = $('#title1');
  var sinSubtitle1 = $('#subtitle1');

  var sinTitle2 = $('#title2');
  var sinSubtitle2 = $('#subtitle2');

  var sinTitle3 = $('#title3');
  var sinSubtitle3 = $('#subtitle3');

  var descr1 = $('#descr1');
  var descr2 = $('#descr2');
  var descr3 = $('#descr3');

  var img1 = $('#img1');
  var img2 = $('#img2');
  var img3 = $('#img3');


  var bg1 = $('#bg1');
  var bg2 = $('#bg2');
  var bg3 = $('#bg3');

  var isActiveBtn = true;
  var currentIndex = '1';

  if (window.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      window.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      window.addEventListener("mousewheel", onWheel);
    } else {
      // Firefox < 17
      window.addEventListener("MozMousePixelScroll", onWheel);
    }
  } else { // IE8-
    window.attachEvent("onmousewheel", onWheel);
  }


  function onWheel(e) {
    e = e || window.event;

    //// wheelDelta не дает возможность узнать количество пикселей
    var deltaX = e.deltaY || e.detail || e.wheelDelta;

    if (isActiveBtn) {

      console.log('deltaX ', deltaX);
      isActiveBtn = false;

      paginationItem.removeClass('active');

      switch(currentIndex) {
        case '1':
          currentIndex = '2';
          changeSlide('1');
          $('.pagination-item[data-index=' + 2 + ']').addClass('active');
          break;
        case '2':
          currentIndex = '3';
          changeSlide('2');
          $('.pagination-item[data-index=' + 3 + ']').addClass('active');
          break;
        case '3':
          currentIndex = '1';
          changeSlide('3');
          $('.pagination-item[data-index=' + 1 + ']').addClass('active');
          break;
      }

      //
      // if (currentIndex === '2') {
      //
      // } else {
      //   currentIndex = '2';
      //   changeSlide('1');
      //   $('.pagination-item[data-index=' + 2 + ']').addClass('active')
      // }

    }
  }

  function changeSlide(currentIndex){

    console.log('changeSlide');

    var newIndex;
    var otherIndex;
    var lastIndex = currentIndex;

    switch(lastIndex) {
      case '1':
        newIndex ='2';
        otherIndex = '3';
        break;
      case '2':
        newIndex ='3';
        otherIndex = '1';
        break;
      case '3':
        newIndex ='1';
        otherIndex = '2';
        break;
    }

    console.log(newIndex, lastIndex);

    $('#img'+newIndex).css('z-index', 3);
    $('#img'+lastIndex).css('z-index', 2);
    $('#descr'+newIndex).css('z-index', 3);
    $('#descr'+lastIndex).css('z-index', 2);
    $('#title'+newIndex).css('z-index', 3);
    $('#title'+lastIndex).css('z-index', 2);
    $('#subtitle'+newIndex).css('z-index', 3);
    $('#subtitle'+lastIndex).css('z-index', 2);

    // background

    // var finishStyle = { '-webkit-mask-position': '0% 0%', 'z-index': 1, transform: 'scale(1.35 , 1.35)'};
    // var initStyle = { '-webkit-mask-position': '0% 0%', 'z-index': 2, transform: 'scale(1, 1)'};

    var initStyle = { '-webkit-mask-position': '0% 0%'};
    var finishStyle = { '-webkit-mask-position': '100% 0%'};
    var otherStyle = { '-webkit-mask-position': '0% 0%'};

    // $('#bg'+otherIndex).css({'z-index': -1});
    // $('#bg'+newIndex).css({'z-index': 2, '-webkit-mask-position': '0% 0%'});
    // $('#bg'+lastIndex).css({'z-index': 1, '-webkit-mask-position': '0% 0%'});

    // верхняя картинка
    TweenLite.to($('#bg'+lastIndex), 0.7, {
      css: {
        '-webkit-mask-position': '100% 0%'
      },
      delay: 0,
      ease: Power0.easeNone,
      onComplete: function () {
        $('#bg'+lastIndex).css({'z-index': -1, '-webkit-mask-position': '0% 0%'});
        $('#bg'+newIndex).css({'z-index': 2, '-webkit-mask-position': '0% 0%'});
        $('#bg'+otherIndex).css({'z-index': 1, '-webkit-mask-position': '0% 0%'});
      }
    });

    TweenLite.to($('#bg'+newIndex), 0.7, {
      css: {
        'transform': 'scale(1, 1)'
      },
      delay: 0,
      ease: Power3.easeOut
    });

    TweenLite.to($('#bg'+otherIndex), 0, {
      css: {
        'transform': 'scale(1.35 , 1.35)'
      },
      delay: 0.7
    });

    TweenLite.to($('#bg'+lastIndex), 0, {
      css: {
        'transform': 'scale(1.35 , 1.35)'
      },
      delay: 0.7
    });

    // TweenLite.to($('#bg'+otherIndex), 0, {
    //   css: initStyle,
    //   delay: 0.7
    // });

    // нижняя картинка
    // TweenLite.to($('#bg'+lastIndex), 0.7, {
    //   css: {
    //     'transform': 'scale(1 , 1)'
    //   },
    //   delay: 0,
    //   ease: Power3.easeOut
    // });

    // TweenLite.to($('#bg'+lastIndex), 0, {
    //   css: otherStyle,
    //   delay: 0.7
    // });


    // title

    TweenLite.to( $('#title'+lastIndex), 1, {
      css: {transform: "translateY(4rem)", opacity: 0},
      ease: Power3.easeOut,
      delay: 0.2
    });

    TweenLite.to($('#title'+newIndex), 0.8, {
      css: {transform: "translateX(0px)", opacity: 1},
      ease: Power3.easeOut,
      delay: 0.8
    });

    TweenLite.to( $('#title'+lastIndex), 0, {
      css: {transform: "translateX(-10rem)"},
      delay: 0.8
    });

    // subtitle

    TweenLite.to($('#subtitle'+lastIndex), 1, {
      css: {transform: "translateY(4rem)", opacity: 0},
      ease: Power3.easeOut
    });

    TweenLite.to($('#subtitle'+newIndex), 0.8, {
      css: {transform: "translateX(0px)", opacity: 1},
      ease: Power3.easeOut,
      delay: 1
    });

    TweenLite.to( $('#subtitle'+lastIndex), 0, {
      css: {transform: "translateX(-100px)"},
      delay: 0.8
    });

    // descr

    TweenLite.to($('#descr'+lastIndex), 1, {
      css: {'line-height': "4rem", transform: "translateY(50px)", opacity: 0},
      ease: Power3.easeOut
    });

    TweenLite.to($('#descr'+newIndex), 0.7, {
      css: {'line-height': "3.2rem", opacity: 1, transform: 'translateY(0px)'},
      ease: Power3.easeOut,
      delay: 0.8
    });

    // img

    TweenLite.to($('#img'+newIndex), 0.3, {
      css: {opacity: 1, transform: 'scale(1, 1)'},
      ease: Power2.easeOut,
      delay: 0.8
    });

    // TweenLite.to($('#img'+newIndex), 0.4, {
    //   css: {opacity: 1, transform: 'scale(1,1)'},
    //   ease: Power1.easeOut,
    //   delay: 1.1
    // });


    TweenLite.to($('#img'+lastIndex), 0.35, {
      css: {opacity: 0, transform: 'scale(0.8 ,0.8)'},
      ease: Power3.easeOut,
      delay: 0.2,
      onComplete: function () {
        isActiveBtn = true;
      }
    });

  }

  paginationItem.click(function () {

    if (isActiveBtn) {
      isActiveBtn = false;
      paginationItem.removeClass('active');

      debugger;

      switch(currentIndex) {
        case '1':
          currentIndex = '2';
          changeSlide('1');
          $(this).addClass('active');
          break;
        case '2':
          currentIndex = '3';
          changeSlide('2');
          $(this).addClass('active');
          break;
        case '3':
          currentIndex = '1';
          changeSlide('3');
          $(this).addClass('active');
          break;
      }

      //
      //
      // if (currentIndex === '2') {
      //   currentIndex = '1';
      //   changeSlide('2');
      //   $(this).addClass('active');
      // } else {
      //   currentIndex = '2';
      //   changeSlide('1');
      //   $(this).addClass('active');
      // }


    }
  });

});
