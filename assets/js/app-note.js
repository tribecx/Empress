$(document).ready(function() {
    menu();
    menuPosition();
    menuBehaviour();
    getPost();
    getNews();
    contactSteps();
    mailer();
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

function getPost() {
  var id = getUrlParameter('id');

  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/aplicacionesempress.wordpress.com/posts/"+id+"",
    dataType: 'json'
  }).then(function(data) {
    drawPost(data);
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

    showPopular(posts, tags);
  });
}

function drawPost(data) {
  var background = data.featured_media_url;
  var title = data.title.rendered;
  var date = dateConverter(data.date);
  var content = data.content.rendered;
  //var tag = traslateTag(posts[data].tags[data], tags);

  $('.cover-image-note').css('background','url("'+background+'") center/cover no-repeat');
  $('.centered-title').html(title);
  $('.subtitle-time').html(date);
  $('.post-information').html(content);
  //$('.subtitle').html(tag);
}

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

function dateConverter(date) {
  var rawDate = date.split('T');
  var shortDate = rawDate[0].split('-');
  var month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  var newDate = shortDate[2] + ' de ' + month[parseInt(shortDate[1])-1] + ' de ' + shortDate[0];

  return newDate;
}

function menuBehaviour() {
  $(document).scroll(function() {
    var bgBottom = $('.notebackground').offset().top + $('.notebackground').innerHeight();

    $('.menu-link').each(function() {
      var current = $(this).offset().top + $(this).innerHeight();

      if (current > bgBottom) {
        $(this).removeClass('alt');
      } else {
        $(this).addClass('alt');
      }
    });
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

function showMainPopular (posts, tags) {
  var background = posts[0].featured_media_url;
  var image = '.most-popular-image';
  var tag = traslateTag(posts[0].tags[0], tags);
  var title = posts[0].title.rendered;
  var content = $(posts[0].excerpt.rendered).text();
  var date = dateConverter(posts[0].date);
  var id = posts[0].id;

  var main =
  '<div class="most-popular-image">'+
  '<a href="blog-note.html?id='+id+'">'+
    '<div class="shadow"></div>'+
    '<div class="popular-title-wraper">'+
      '<div class="popular-titles">'+
        '<span class="tiny-title">'+tag+'</span>'+
        '<span class="soft-title">'+title+'</span>'+
      '</div>'+
    '</div>'+
  '</a>'+
  '</div>';

  $('.main-global').append(main);

  $(image).css('background','url("'+background+'") center/cover no-repeat');

}

function showPopular (posts, tags) {
	showMainPopular(posts, tags);

	for (var i = 1; i <= 5; i++) {
    var background = posts[i].featured_media_url;
    var popularImage = '.item-image'+i+'';
    var tag = traslateTag(posts[i].tags[0], tags);
    var title = posts[i].title.rendered;
    var id = posts[i].id;

    var popular =
      '<div class="popular-item">'+
        '<a href="blog-note.html?id='+id+'">'+
          '<div class="item-image item-image'+i+'"></div>'+
          '<div class="item-text">'+
            '<div class="item-wrapper">'+
              '<p class="tag">'+tag+'</p>'+
              '<h4 class="title" title="'+title+'">'+title+'</h4>'+
            '</div>'+
          '</div>'+
        '</a>'+
      '</div>';

    $('.little-news').append(popular);

    $(popularImage).css('background','url("'+background+'") center/cover no-repeat');

  }
}

function contactSteps() {
  var step1 = $('.contact-field').eq(0);
  var step2 = $('.contact-field').eq(1);
  var step3 = $('.contact-field').eq(2);
  var form = $('#contact-form');

  $(step1).show();

  $('.next-btn').eq(0).click(function() {
    var email = $('#email').val().toString();

    if (isEmail(email)) {
      $(form).removeClass('submitted');

      $(step1).fadeOut('fast', function() {
        $(step2).fadeIn();
      });
    } else {
      $(form).addClass('submitted');
    }
  });

  $('.next-btn').eq(1).click(function() {
    $(step2).fadeOut('fast', function() {
      $(step3).fadeIn();
    });
  });
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function mailer() {
  var form = $('#contact-form');
  var alert = $('.contact-alert .alert-center');

  $('.contact-submit').click(function() {
    $(form).addClass('submitted');
  });

  $(form).submit(function(e) {
    e.preventDefault();

    var formData = $(form).serialize();

    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    }).done(function(response) {
      $(alert).removeClass('error');
      $(alert).addClass('success');

      $(alert).text(response);
      $(form).removeClass('submitted');

      $('#email').val('');
      $('#subject1').prop('checked', true);
    }).fail(function(data) {
      $(alert).removeClass('success');
      $(alert).addClass('error');

      if (data.responseText !== '') {
				$(alert).text(data.responseText);
			} else {
				$(alert).text('Lo sentimos, ha ocurido un error. Por favor intenta nuevamente.');
			}
    });
  });
}
