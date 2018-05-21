$(document).ready(function() {
  menu();
  changeSection();
  dropDown();
  equalHeight();
  menuPosition();
});

function menu() {
  $('.menu-btn').on('click', function() {
    $('.menu-box').toggleClass('out');
  });
}

function changeSection() {
  $('.option').each(function(index, element) {
    $(element).on('click', function() {
      $('.option').removeClass('active');
      $('.info').removeClass('active');
      $(this).addClass('active');
      $('.info:eq('+index+')').addClass('active');

      $('.info').fadeOut('fast').promise().done(function() {
        $('.info:eq('+index+')').fadeIn('fast');
      });
    });
  });
}

function dropDown() {
  $('.info-drop').each(function(index, element) {
    $(element).on('click', function() {
      if ($('.info-down:eq('+index+')').hasClass('visible')) {
        $(this).children('.dropdown-state').replaceWith('(+)');
      }
      
      $('.info-down:eq('+index+')').toggleClass('visible');
      $(this).children('.dropdown-state').replaceWith('(-)');
    });
  });
}

function equalHeight() {
  $('.equalheight').each(function() {
    var heights = [];
    var higher = 0;

    $(this).children('div').each(function() {
      heights.push($(this).height());
    });

    higher = Math.max.apply(Math,heights);

    $(this).children('div').each(function() {
      $(this).css('height', higher);
    });
  });
}

function menuPosition() {
  var menu = $('.menu'),
      startPosition = menu.offset().top,
      stopPosition = $('.footer').offset().top - menu.outerHeight();

  $(document).scroll(function() {
    var top = $(this).scrollTop();

    if (top > startPosition) {
      if (top > stopPosition) {
        menu.css({'position':'absolute','top':stopPosition});
      } else {
        menu.css({'position':'fixed','top':0});
      }
    }
  });
}
