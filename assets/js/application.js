$(document).ready(function() {
  menu();
  clientsState();
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
