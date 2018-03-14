$(document).ready(function() {
  getPosts();
});

function getPosts() {
  $.ajax({
    url: "https://public-api.wordpress.com/wp/v2/sites/empress935163467.wordpress.com/posts?per_page=100&orderby=date",
    dataType: 'json'
  }).then(function(data) {
    showPosts(data);
  });
}

function showPosts(data) {
  for (var i = 0; i <= data.lenght; i++) {
    var background = data[i].featured_media_url;
    var image = '.item-cover'+i+'';
    var tag = data[i].tags.rendered;
    var title = data[i].title.rendered;
    var content = $(data[i].excerpt.rendered).text();
    var date = dateConverter(data[i].date);
    var id = data[i].id;

    var item = 
      '<a href="blog-note.html?id='+id+'">'+
        '<div class="article-item margin-left">'+
        '<div class="item-cover item-cover'+i+'"></div>'+
          '<div class="item-content">'+
            '<div class="item-info">'+
              '<p class="item-tag">'+tag+'</p>'+
              '<h3 class="item-title">'+title+'</h3>'+
              '<p class="item-excerpt">'+content+'</p>'+
              '<p class="item-date">'+date+'</p>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</a>';

    $('.articles').append(item);

    $(image).css('background','url("'+background+'") center/cover no-repeat');
  }
}

function dateConverter(date) {
  var rawDate = date.split('T');
  var shortDate = rawDate[0].split('-');
  var month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  var newDate = shortDate[2] + ' de ' + month[parseInt(shortDate[1])-1] + ' de ' + shortDate[0];

  return newDate;
}