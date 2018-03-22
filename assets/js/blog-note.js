$(document).ready(function() {
    menuNoteBehaviour();
    getPost();
});

function getPost() {
  var id = getUrlParameter('id');

  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/ocupasite.wordpress.com/posts/"+id+"",
    dataType: 'json'
  }).then(function(data) {
    drawPost(data);
  });

  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/ocupasite.wordpress.com/posts?per_page=4&orderby=date",
    dataType: 'json'
  }).then(function(data) {
    drawLast(data);
  });
}

function drawPost(data) {
  var background = data.featured_media_url;
  var title = data.title.rendered;
  var date = dateConverter(data.date);
  var content = data.content.rendered;

  $('.cover-image-note').css('background','url("'+background+'") center/cover no-repeat fixed');
  $('.centered-title').html(title);
  $('.subtitle-time').html(date);
  $('.post-information').html(content);
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

function menuNoteBehaviour() {
  $(document).scroll(function() {
    if ($(document).scrollTop() < ($('.notebackground').offset().top + $('.notebackground').innerHeight())) {
      $('.menu-link').removeClass('alternative-link');
    } else {
      $('.menu-link').addClass('alternative-link');
    }
  });
}
