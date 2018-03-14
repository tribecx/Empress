$(document).ready(function() {
  getPost();
});

function getPost() {
  var id = getUrlParameter('id');

  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/empress935163467.wordpress.com/posts/"+id+"",
    dataType: 'json'
  }).then(function(data) {
    drawPost(data);
  });

  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/empress935163467.wordpress.com/tags/",
    dataType: 'json'
  }).then(function(data) {
    tagTranslate(data);
  });
}

function tagTranslate(data) {
  

}

function drawPost(data) {
  var background = data.featured_media_url;
  var tag = data.tags.rendered;
  var title = data.title.rendered;
  var date = dateConverter(data.date);
  var content = data.content.rendered;

  $('.cover-image-note').css('background','url("'+background+'") center/cover no-repeat fixed');
  $('.centered-title').html(title);
  $('.subtitle').html(tag);
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