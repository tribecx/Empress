$(document).ready(function() {
    menuNoteBehaviour();
});

function menuNoteBehaviour() {
  $(document).scroll(function() {
    if ($(document).scrollTop() < ($('.notebackground').offset().top + $('.notebackground').innerHeight())) {
      $('.menu-link').removeClass('alternative-link');
    } else {
      $('.menu-link').addClass('alternative-link');
    }
  });
}
