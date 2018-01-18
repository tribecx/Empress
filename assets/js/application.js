$(document).ready(function() {
  menu();
});

function menu() {
  $('.menu-btn').on('click', function() {
    $('.menu-box').toggleClass('out');
  });
}
