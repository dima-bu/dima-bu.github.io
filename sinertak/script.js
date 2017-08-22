document.addEventListener('DOMContentLoaded', function(){
  var paginationItem = $('.pagination-item');

  //var sinTitle1 = $('#title1');
  //var sinSubtitle1 = $('#subtitle1');
  //
  //var sinTitle2 = $('#title2');
  //var sinSubtitle2 = $('#subtitle2');
  //
  //var sinTitle3 = $('#title3');
  //var sinSubtitle3 = $('#subtitle3');
  //
  //var descr1 = $('#descr1');
  //var descr2 = $('#descr2');
  //var descr3 = $('#descr3');
  //var descr4 = $('#descr4');
  //var descr5 = $('#descr5');
  //
  //var img1 = $('#img1');
  //var img2 = $('#img2');
  //var img3 = $('#img3');
  //var img4 = $('#img4');
  //var img5 = $('#img5');
  //
  //var bg1 = $('#bg1');
  //var bg2 = $('#bg2');
  //var bg3 = $('#bg3');
  //var bg3 = $('#bg4');
  //var bg3 = $('#bg5');


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

      // var currentIndex = $('.pagination-item.active')[0].dataset.index;
      //
      // var nextIndex;

      if (deltaX > 0) {
        var currentIndex = $('.pagination-item.active')[0].dataset.index;
        paginationItem.removeClass('active');
        var nextIndex;

        if (currentIndex === '5') {
          nextIndex = 1;
        } else {
          nextIndex = +currentIndex+1;
        }

        changeSlide(currentIndex, ''+nextIndex);
      }

      if (deltaX <= 0) {
        var currentIndex = $('.pagination-item.active')[0].dataset.index;
        paginationItem.removeClass('active');
        var nextIndex;
        if (currentIndex === '1') {
          nextIndex = 5;
        } else {
          nextIndex = +currentIndex-1;
        }

        changeSlide(currentIndex, ''+nextIndex);
      }

      $('.pagination-item[data-index=' + nextIndex + ']').addClass('active');

    }
  }

  $('.main-wrapper').touchwipe({
    wipeLeft: function() {

    if (isActiveBtn) {
      isActiveBtn = false;

      var currentIndex = $('.pagination-item.active')[0].dataset.index;
      paginationItem.removeClass('active');
      var nextIndex;

      if (currentIndex === '5') {
        nextIndex = 1;
      } else {
        nextIndex = +currentIndex+1;
      }

      changeSlide(currentIndex, ''+nextIndex);

      $('.pagination-item[data-index=' + nextIndex + ']').addClass('active');
    }
  }, wipeRight: function() {
    if (isActiveBtn) {
      isActiveBtn = false;

      var currentIndex = $('.pagination-item.active')[0].dataset.index;
      paginationItem.removeClass('active');
      var nextIndex;
      if (currentIndex === '1') {
        nextIndex = 5;
      } else {
        nextIndex = +currentIndex-1;
      }

      changeSlide(currentIndex, ''+nextIndex);
    }

    $('.pagination-item[data-index=' + nextIndex + ']').addClass('active');

    }
  });


  function changeSlide(currentIndex, lastIndexStrong){

    console.log('changeSlide', currentIndex);

    var allIndexes = ['1', '2', '3', '4', '5'];

    var newIndex;
    var otherIndex;
    var lastIndex = currentIndex;

    //if(!lastIndexStrong){
    //  switch(lastIndex) {
    //    case '1':
    //      newIndex ='2';
    //      otherIndex = '3';
    //      break;
    //    case '2':
    //      newIndex ='3';
    //      otherIndex = '4';
    //      break;
    //    case '3':
    //      newIndex ='4';
    //      otherIndex = '5';
    //      break;
    //    case '4':
    //      newIndex ='5';
    //      otherIndex = '1';
    //      break;
    //    case '5':
    //      newIndex ='1';
    //      otherIndex = '2';
    //      break;
    //  }
    //} else {
      newIndex = lastIndexStrong;
      lastIndex = currentIndex;
    //}

    var newIndexIndex =  allIndexes.indexOf(newIndex);
    allIndexes.splice(newIndexIndex, 1);
    var lastIndexIndex =  allIndexes.indexOf(lastIndex);
    allIndexes.splice(lastIndexIndex, 1);

    console.log(allIndexes);
    console.log(newIndex, lastIndex);

    $('#img'+newIndex).css('z-index', 3);
    $('#img'+lastIndex).css('z-index', 2);
    $('#descr'+newIndex).css('z-index', 3);
    $('#descr'+lastIndex).css('z-index', 2);
    $('#title'+newIndex).css('z-index', 3);
    $('#title'+lastIndex).css('z-index', 2);
    $('#subtitle'+newIndex).css('z-index', 3);
    $('#subtitle'+lastIndex).css('z-index', 2);

    allIndexes.forEach(function(item){
      $('#img'+item).css('z-index', 1);
      $('#descr'+item).css('z-index', 1);
      $('#title'+item).css('z-index', 1);
      $('#subtitle'+item).css('z-index', 1);
      $('#bg'+item).css('z-index', 0);
    });

     $('#bg'+newIndex).css({'z-index': 1, '-webkit-mask-position': '0% 0%'});
     $('#bg'+lastIndex).css({'z-index': 2, '-webkit-mask-position': '0% 0%'});

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
        $('#bg'+lastIndex).css({'z-index': 0, '-webkit-mask-position': '0% 0%'});
        currentIndex = newIndex;
        //$('#bg'+newIndex).css({'z-index': 2, '-webkit-mask-position': '0% 0%'});
        //$('#bg'+otherIndex).css({'z-index': 1, '-webkit-mask-position': '0% 0%'});
      }
    });


    // увеличение нижнего фото
     TweenLite.to($('#bg'+newIndex), 0.7, {
      css: {
        'transform': 'scale(1, 1)'
      },
      delay: 0,
      ease: Power3.easeOut
     });


    allIndexes.forEach(function(item) {
      TweenLite.to($('#bg'+item), 0, {
        css: {
          'transform': 'scale(1.35 , 1.35)'
        },
        delay: 0.8
      });
    });

    TweenLite.to($('#bg'+lastIndex), 0, {
      css: {
        'transform': 'scale(1.35 , 1.35)'
      },
      delay: 0.8
    });



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
      delay: 0.8,
      onComplete: function () {
        isActiveBtn = true;
      }
    });

    // TweenLite.to($('#img'+newIndex), 0.4, {
    //   css: {opacity: 1, transform: 'scale(1,1)'},
    //   ease: Power1.easeOut,
    //   delay: 1.1
    // });

    TweenLite.to($('#img'+lastIndex), 0.35, {
      css: {opacity: 0, transform: 'scale(0.8 ,0.8)'},
      ease: Power3.easeOut,
      delay: 0.2
    });

  }

  paginationItem.click(function () {

    if (isActiveBtn) {

      var currentIndex = $('.pagination-item.active')[0].dataset.index;
      isActiveBtn = false;
      paginationItem.removeClass('active');
      $(this).addClass('active');

      changeSlide(currentIndex, this.dataset.index);
    }
  });

});
