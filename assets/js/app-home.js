$(document).ready(function() {
  menu();
  menuPosition();
  getNews();
});

function menu() {
  $('.menu-btn').on('click', function() {
    $('.menu-box').toggleClass('out');
  });
}

function menuPosition() {
  var menu = $('.menu');

  $(document).scroll(function() {
    var top = $(document).scrollTop(),
        stop = $('.contact-section').offset().top - menu.innerHeight();

    if (top > stop) {
      menu.css({'position':'absolute','top':stop});
    } else {
      menu.css({'position':'fixed','top':0});
    }
  });
}

function getNews() {
  $.ajax({
  	url: "https://public-api.wordpress.com/wp/v2/sites/aplicacionesempress.wordpress.com/posts?per_page=100&orderby=date",
  	dataType: 'json'
  }).then(function(posts) {
    getTags(posts);
  });
}

function getTags(posts) {
  $.ajax({
  	url: "https://public-api.wordpress.com/wp/v2/sites/aplicacionesempress.wordpress.com/tags",
  	dataType: 'json'
  }).then(function(data) {
    var tags = [];

    for (var i = 0; i < data.length; i++) {
      var tag = {id: data[i].id, name: data[i].name};

      tags.push(tag);
    }

    showPosts(posts, tags);
  });
}

function showPosts(posts, tags) {

  for (var i = 0; i <= 2; i++) {
    var background = posts[i].featured_media_url;
    var image = '.thumbnail'+i+'';
    var tag = traslateTag(posts[i].tags[0], tags);
    var title = posts[i].title.rendered;
    var content = $(posts[i].excerpt.rendered).text();
    var date = dateConverter(posts[i].date);
    var id = posts[i].id;

    var post =
    '<div class="news-item col s12 m6 l4">'+
      '<a href="blog-note.html?id='+id+'">'+
        '<div class="thumbnail thumbnail'+i+'"></div>'+
        '<div class="info">'+
          '<span class="tag">'+tag+'</span>'+
          '<p class="title">'+title+'</p>'+
          '<p class="excerpt">'+content+'</p>'+
          '<span class="time hide-on-med-and-down">'+date+'</span>'+
        '</div>'+
      '</a>'+
    '</div>';

    $('.news-wrapper').append(post);

    $(image).css('background','url("'+background+'") center/cover no-repeat');

  }

  setVisibility();
}

function setVisibility() {
  $('.news-item').each(function(index, element) {
    if ($(this).index() == 2) {
      $(this).addClass('hide-on-med-and-down');
    } else if ($(this).index() == 1) {
      $(this).addClass('hide-on-small-only');
    }
  });
}

function traslateTag(id, tags) {
  for (var i = 0; i < tags.length; i++) {
    if (id == tags[i].id) {
      var name = tags[i].name;
    }
  }

  return name;
}

function dateConverter(date) {
  var rawDate = date.split('T');
  var shortDate = rawDate[0].split('-');
  var month = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  var newDate = shortDate[2] + ' de ' + month[parseInt(shortDate[1])-1] + ' de ' + shortDate[0];

  return newDate;
}

$(document).ready(function(){
  $('#submit-btn').click(function(event){
    if($("input:radio[name='radio']").is(":checked")){
      event.preventDefault();
       $.ajax({
          dataType: 'JSON',
          url: 'assets/php/sendmail.php',
          type: 'POST',
          data: $('#msform').serialize(),
          success: function(response){
            if(response){
              console.log(response);
              if(response['signal'] == 'ok'){
               $('#msg').html('<div class="alert alert-success">'+ response['msg']+'</div>');
              }
              else{
                $('#msg').html('<div class="alert alert-danger">'+ response['msg'] +'</div>');
              }
            }
          },
          error: function(){
            $('#msg').html('<div class="alert alert-danger">Errors occur. Please try again later.</div>');
          },
        });

        if(animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
          //show the next fieldset
          next_fs.show();
          //hide the current fieldset with style
          current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
              //as the opacity of current_fs reduces to 0 - stored in "now"
              //1. scale current_fs down to 80%
              scale = 1 - (1 - now) * 0.2;
              //2. bring next_fs from the right(50%)
              left = (now * 50)+"%";
              //3. increase opacity of next_fs to 1 as it moves in
              opacity = 1 - now;
              current_fs.css({'transform': 'scale('+scale+')'});
              next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
              current_fs.hide();
              animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
          });
    }
    else{
      $('#alert-message-submit').html('Elige un asunto');
    }
  });
});

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches



$(".submit").click(function(){
	return false;
})

$('#selection .radio-custom').on('click', function(){
     $(this).addClass('active').siblings().removeClass('active');
});
function notempty(id){
    // we grab the id value passed in the function
    var value = $("#"+id).val();
    // we get the character length
    var len = value.length;
    // check if the lenght is less then 1 character, you can change this value to check if less than 3 characters
    if (len < 1){
        return false;
    }else{
        return true;
    }
}

$(".next").click(function(){
    // place the returned value into a variable
    var result = $(email).val();
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    console.log(result);
    // check if the returned value is true or false
    if (caract.test(result) == true){
        if(animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
          step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50)+"%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'transform': 'scale('+scale+')'});
            next_fs.css({'left': left, 'opacity': opacity});
          },
          duration: 800,
          complete: function(){
            current_fs.hide();
            animating = false;
          },
          //this comes from the custom easing plugin
          easing: 'easeInOutBack'
        });
    }
    else{
     $('#alert-message').html('Correo incorrecto');
    }
});
