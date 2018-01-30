$(document).ready(function() {
  menu();
  clientsState();
  equalHeight();
});

function menu() {
  $('.menu-btn').on('click', function() {
    $('.menu-box').toggleClass('out');
  });
}

function clientsState() {
  $('.clients-anchor').each(function(index, element) {
    $(element).on('click', function() {
      $('.clients-anchor').removeClass('active');
      $(this).addClass('active');

      $('.clients-item').fadeOut('fast').promise().done(function() {
        $('.clients-item:eq('+index+')').fadeIn('fast');
      });
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
