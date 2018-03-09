/*$(function() {
   $(window).scroll(function () {
      if ($(this).scrollTop() > 555.9) {
         $(‘blog-menu-link’).addClass(‘menu-link’)
      }
      if ($(this).scrollTop() < 555.9) {
         $(‘blog-menu-link’).removeClass(‘menu-link’)
      }
   });
});*/

$(document).ready(function() {
	miFuncion();
});

function miFuncion() {
  $(window).scroll(function miFuncion() {
      if ($(this).scrollTop() > 555.9) {
         $(‘blog-menu-link’).addClass(‘menu-link’)
      }
      if ($(this).scrollTop() < 555.9) {
         $(‘blog-menu-link’).removeClass(‘menu-link’)
      }
   });
}

/*$(document).ready(function () {
    var scroll_pos = 0;
    $("blog-menu-link").scroll(function () {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 555.9) {
            $("blog-menu-link").scss('color', '#07778C');
        } else {
            $("blog-menu-link").scss('color', '#FFFFFF');
        }
        console.log(scroll_pos);
    });
});*/