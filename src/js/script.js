console.log("alert");

$(document).ready(function() {
  $('#outline').on('click', 'li', function() {
    $(this).children('.detail').slideToggle('fast');
  });
  //fixheight();
  recognizeUA();
  console.log("alert");
});

$(window).load(function() {
  $('.fadeinBefore').addClass('fadein');
  $("#wrapperTop2").css("opacity",1);
  $(".preparationSp").css("opacity",1);
  //$('#wrapperSecond').find('.headerNav').addClass('fadein');
});

$(window).scroll(function() {
  // twitter widgetの高さを設定
  var twFrame = [];
  var twHeight = 0;
  var size = $('iframe').length;
  for(var i = 0; i < size; i++) {
    var tmp = parseInt($('iframe#twitter-widget-' + i).css('height'));
    if(i == 0) {
      twHeight = tmp;
    } else {
      if(twHeight > tmp) {
        twHeight = tmp
      }
    }
  }
  //var tweetsHeight = $('.column').css('height');
  $('#tweets').css({'height': twHeight + 'px'});

  // フェードインアニメーションの設定
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();

  $('.fadeinScrollBefore').each(function() {
    var elementPos = $(this).offset().top;
    if(scroll > elementPos - windowHeight + windowHeight / 5) {
      $(this).addClass('fadeinScroll');
    }
  });
});

function fixheight() {
  var hsize = $(window).height();
  var contentsHeightSp =  hsize*0.70;
  var contentsHeight = hsize - 493;
  if(contentsHeight < 30) {
    contentsHeight = 30;
  }
  $("#wrapperTop").css("height", contentsHeight + "px");
  $(".preparation").find('p').css("height", contentsHeight + "px");
  $(".preparationSp").css("height", contentsHeightSp + "px");
  $(".preparationSp").find('p').css("height", contentsHeightSp + "px");
}

function recognizeUA() {
  var ua = navigator.userAgent;
  var twApp = $(".stepNote").find(".twApp");
  var isApp = $(".stepNote").find(".isApp");
  if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0) {
    twApp.find("a").attr('href', 'https://itunes.apple.com/jp/app/twitter/id333903271?mt=8');
    twApp.find("img").attr('src', 'assets/images/app_tw.jpg');
    isApp.find("a").attr('href', 'https://itunes.apple.com/jp/app/instagram/id389801252?mt=8');
    isApp.find("img").attr('src', 'assets/images/app_is.jpg');
    $(".stepNote").find("ul").css('width', '70%');
  }
  if(ua.indexOf('Android') > 0) {
    twApp.find("a").attr('href', 'https://play.google.com/store/apps/details?id=com.twitter.android&hl=ja');
    twApp.find("img").attr('src', 'assets/images/goo_tw.jpg');
    isApp.find("a").attr('href', 'https://play.google.com/store/apps/details?id=com.instagram.android&hl=ja');
    isApp.find("img").attr('src', 'assets/images/goo_is.jpg');
    $(".stepNote").find("ul").css('width', '82%');
  }
  if(ua.indexOf('iPhone') == -1 && ua.indexOf('iPod') == -1 && ua.indexOf('Android') == -1 && ua.indexOf('Mobile') > 0) {
    $(".stepNote").remove();
  }
}

/*
$(window).load(function() {
  $.when(
    $('#twitter-widget-1').load()
  ).done(function() {
    setTimeout(function(){
      var twFrame = [];
      var twHeight = 0;
      var size = $('iframe').length;
      for(var i = 0; i < size; i++) {
        var tmp = parseInt($('iframe#twitter-widget-' + i).css('height'));
        console.log(tmp);
        if(i == 0) {
          twHeight = tmp;
        } else {
          if(twHeight > tmp) {
            twHeight = tmp
          }
        }
      }
      //var tweetsHeight = $('.column').css('height');
      $('#tweets').css({'height': twHeight + 'px'});
      console.log(twHeight);
    }, 1000);
  });
});
*/
