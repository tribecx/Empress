$(document).ready(function() {
  getNews();
});

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
