 $('.slider-nav').slick({
	 arrows: false,
   slidesToShow: 1,
   slidesToScroll: 1,
	 fade: true,
   focusOnSelect: true
 });

 $('a[data-slide]').click(function(e) {
   e.preventDefault();
   var slideno = $(this).data('slide');
   $('.slider-nav').slick('slickGoTo', slideno - 1);
 });

var header = document.getElementById("activeLinks");
var btns = header.getElementsByClassName("topic-paragraph");
var rects = header.getElementsByClassName("rectangle-changing-topic");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
for (var i = 0; i < btns.length; i++) {
  rects[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
