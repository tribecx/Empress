$(document).ready(function() {
    menuBehaviour();
});

function menuBehaviour() {
  $(document).scroll(function() {
    if ($(document).scrollTop() < ($('.background').offset().top + $('.background').innerHeight())) {
      $('.menu-link').removeClass('alternative-link');
    } else {
      $('.menu-link').addClass('alternative-link');
    }
  });
}
