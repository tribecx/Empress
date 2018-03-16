$(document).ready(function() {
  getNews();
  menuBehaviour();
});

function getNews() {
  $.ajax({
  	url: "https://public-api.wordpress.com/wp/v2/sites/empress935163467.wordpress.com/posts?per_page=100&orderby=date",
  	dataType: 'json'
  }).then(function(posts) {
    getTags(posts);
  });
}

function getTags(posts) {
  $.ajax({
  	url: "https://public-api.wordpress.com/wp/v2/sites/empress935163467.wordpress.com/tags",
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
  for (var i = 0; i <= posts.length; i++) {
    var background = posts[i].featured_media_url;
    var image = '.item-cover'+i+'';
    var tag = traslateTag(posts[i].tags[0], tags);
    var title = posts[i].title.rendered;
    var content = $(posts[i].excerpt.rendered).text();
    var date = dateConverter(posts[i].date);
    var id = posts[i].id;

    var post =
    '<a href="blog-note.html?id='+id+'" class="article-item margin-left">'+
      '<div class="item-cover item-cover'+i+'"></div>'+
      '<div class="item-content">'+
        '<div class="item-info">'+
          '<p class="item-tag">'+tag+'</p>'+
          '<h3 class="item-title">'+title+'</h3>'+
          '<p class="item-excerpt">'+content+'</p>'+
          '<p class="item-date">'+date+'</p>'+
        '</div>'+
      '</div>'+
    '</a>';

    $('.articles').append(post);

    $(image).css('background','url("'+background+'") center/cover no-repeat');
  }
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

function menuBehaviour() {
  $(document).scroll(function() {
    var bgBottom = $('.background').offset().top + $('.background').innerHeight();

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
