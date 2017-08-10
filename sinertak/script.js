document.addEventListener('DOMContentLoaded', function(){
  var paginationItem = $('.pagination-item');

  var sinTitle1 = $('#title1');
  var sinSubtitle1 = $('#subtitle1');
  var sinTitle2 = $('#title2');
  var sinSubtitle2 = $('#subtitle2');

  var descr1 = $('#descr1');
  var descr2 = $('#descr2');

  var img1 = $('#img1');
  var img2 = $('#img2')

  var bg2 = $('#bg2');
  var bg1 = $('#bg1');



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
    //
    //var info = document.getElementById('delta');
    //
    //info.innerHTML = +info.innerHTML + delta;

    if (isActiveBtn) {

      console.log('deltaX ', deltaX);
      isActiveBtn = false;

      paginationItem.removeClass('active');

      if (currentIndex === '2') {
        currentIndex = '1';
        changeSlide('2');
        $('.pagination-item[data-index=' + 1 + ']').addClass('active')
      } else {
        currentIndex = '2';
        changeSlide('1');
        $('.pagination-item[data-index=' + 2 + ']').addClass('active')
      }

      //if (deltaX > 0) {
      //  changeSlide('2');
      //} else {
      //  changeSlide('1');
      //}

    }

    //e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  }

  function changeSlide(currentIndex){

    console.log('changeSlide');

    var newIndex;
    var lastIndex = currentIndex;

    if (lastIndex === '2') {
      newIndex = '1'
    } else {
      newIndex = '2'
    }

    console.log(newIndex, lastIndex);

    //paginationItem.removeClass('active');

    $('#img'+newIndex).css('z-index', 3);
    $('#img'+lastIndex).css('z-index', 2);
    $('#descr'+newIndex).css('z-index', 3);
    $('#descr'+lastIndex).css('z-index', 2);
    $('#title'+newIndex).css('z-index', 3);
    $('#title'+lastIndex).css('z-index', 2);
    $('#subtitle'+newIndex).css('z-index', 3);
    $('#subtitle'+lastIndex).css('z-index', 2);


    // background

    var initStyle = { '-webkit-mask-position': '0% 0%', 'z-index': 2, transform: 'scale(1, 1)'};
    var finishStyle = { '-webkit-mask-position': '0% 0%', 'z-index': 1, transform: 'scale(1.35 , 1.35)'};

    //bg1.css(finishStyle);
    //bg2.css(initStyle);

    $('#bg'+newIndex).css({'z-index': 2, '-webkit-mask-position': '0% 0%'});
    $('#bg'+lastIndex).css({'z-index': 1, '-webkit-mask-position': '0% 0%'});



    // верхняя картинка
    TweenLite.to($('#bg'+newIndex), 0.7, {
      css: {
        '-webkit-mask-position': '100% 0%',
      },
      delay: 0,
      ease: Power0.easeNone
    });

    TweenLite.to($('#bg'+newIndex), 0.7, {
      css: {
        'transform': 'scale(1 , 1)'
      },
      delay: 0,
      ease: Power3.easeOut
    });


    TweenLite.to($('#bg'+newIndex), 0, {
      css: finishStyle,
      delay: 0.7
    });


    // нижняя картинка
    TweenLite.to($('#bg'+lastIndex), 0.7, {
      css: {
        'transform': 'scale(1 , 1)'
      },
      delay: 0,
      ease: Power3.easeOut
    });


    TweenLite.to($('#bg'+lastIndex), 0, {
      css: initStyle,
      delay: 0.7
    });


    //title

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

    //subtitle

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

    //descr

    TweenLite.to($('#descr'+lastIndex), 1, {
      css: {'line-height': "4rem", transform: "translateY(50px)", opacity: 0},
      ease: Power3.easeOut
    });

    TweenLite.to($('#descr'+newIndex), 0.7, {
      css: {'line-height': "3.2rem", opacity: 1, transform: 'translateY(0px)'},
      ease: Power3.easeOut,
      delay: 0.8
    });

    //img

    TweenLite.to($('#img'+newIndex), 0.3, {
      css: {opacity: 1, transform: 'scale(1.1, 1.1)'},
      ease: Power0.easeNone,
      delay: 0.8
    });

    TweenLite.to($('#img'+newIndex), 0.4, {
      css: {opacity: 1, transform: 'scale(1,1)'},
      ease: Power1.easeOut,
      delay: 1.1
    });


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

      if (currentIndex === '2') {
        currentIndex = '1';
        changeSlide('2');
        $(this).addClass('active');
      } else {
        currentIndex = '2';
        changeSlide('1');
        $(this).addClass('active');
      }
    }

    //if ($(this).hasClass('active') || !isActiveBtn){
    //  return false;
    //}
    //
    //isActiveBtn = false;
    ////
    //
    //debugger;

    //var newIndex = $(this)[0].dataset.index;
    //var lastIndex = $('.pagination-item.active')[0].dataset.index;
    //
    //
    //paginationItem.removeClass('active');
    //$(this).addClass('active');

    //changeSlide();


    //background
    //
    //$('#img'+newIndex).css('z-index', 2);
    //$('#img'+lastIndex).css('z-index', 1);
    //$('#bg'+newIndex).css('z-index', 2);
    //$('#bg'+lastIndex).css({'z-index': 1});
    //$('#descr'+newIndex).css('z-index', 2);
    //$('#descr'+lastIndex).css('z-index', 1);
    //$('#title'+newIndex).css('z-index', 2);
    //$('#title'+lastIndex).css('z-index', 1);
    //$('#subtitle'+newIndex).css('z-index', 2);
    //$('#subtitle'+lastIndex).css('z-index', 1);




    // TweenLite.to(sinTitle1, 1, {
    //   css: {transform: "translateY(40px)", opacity: 0},
    //   ease: Power3.easeOut,
    //   delay: 0.2
    // });

    // TweenLite.to(sinSubtitle1, 1, {
    //   css: {transform: "translateY(40px)", opacity: 0},
    //   ease: Power3.easeOut
    // });

    // TweenLite.to(sinTitle2, 0.8, {
    //   css: {transform: "translateX(0px)", opacity: 1},
    //   ease: Power3.easeOut,
    //   delay: 0.8
    // });

    // TweenLite.to(sinSubtitle2, 0.8, {
    //   css: {transform: "translateX(0px)", opacity: 1},
    //   ease: Power3.easeOut,
    //   delay: 1
    // });

    //

    // TweenLite.to(descr1, 1, {
    //   css: {'line-height': "40px", transform: "translateY(50px)", opacity: 0},
    //   ease: Power3.easeOut
    // });
    //
    // TweenLite.to(descr2, 0.7, {
    //   css: {'line-height': "30px", opacity: 1, transform: 'translateY(0px)'},
    //   ease: Power3.easeOut,
    //   delay: 1.6
    // });
    //
    // TweenLite.to(img2, 0.4, {
    //   css: {opacity: 1, transform: 'scale(1,1)'},
    //   ease: Power3.easeOut,
    //   delay: 0.8
    // });

    // var photo = document.getElementById("photo");
    // var sinTitle = document.getElementById("sin_title");
    // var text1 = document.getElementById("text-1");
    // var bg2 = document.getElementById("bg-2");
    //
    //
    // $('#photo').click(function () {
    //   TweenLite.to(photo, 1.5, {width:200,  ease: Power3.easeOut});
    //   TweenLite.to(title1, 1.5, {css: {transform: "translateY(100px)", opacity: 0.3}, ease: Power3.easeOut});
    //   TweenLite.to(text1, 1, {css: {'line-height': "50px", transform: "translateY(100px)", opacity: 0.3},  ease: Power3.easeOut});
    //   TweenLite.to(bg2, 1, {
    //     left: "-100%"
    //   });
    // })


  });

});
