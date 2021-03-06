$(document).ready(function() {
  menu();
  menuPosition();
  scrollAnimation();
  getNews();
  contactSteps();
  mailer();
  smoothScroll();
  ceilingButton();
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

function scrollAnimation() {
  window.sr = ScrollReveal({ delay: 100 });

  sr.reveal('.reveal');
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

function smoothScroll() {
	if ($('.header').innerHeight() > 78) header = 78;
   else var header = $('.header').innerHeight();
	$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (e) {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var o = $(this.hash);
			(o = o.length ? o : $('[name=' + this.hash.slice(1) + ']')).length && (e.preventDefault(), $('html, body').animate({
				scrollTop: o.offset().top - header
			}, 1000, 'easeInOutExpo', function () {
				var e = $(o);
				if (e.focus(), e.is(':focus')) return !1;
				e.attr('tabindex', '-1'),
				e.focus()
			}))
		}
	})
}

function ceilingButton() {
  $(window).scroll(function() {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    var scrollDistance = (scrollHeight - scrollPosition) / scrollHeight;

    if (scrollDistance === 0) {
      $('.ceiling').fadeOut();
    } else if (scrollDistance > 0 && scrollDistance < 0.3) {
      $('.ceiling').fadeIn();
    } else {
      $('.ceiling').fadeOut();
    }
  });
}

$.easing.jswing = $.easing.swing;

$.extend($.easing, {
	def: 'easeOutQuad',
	swing: function (e, t, n, a, u) {
		return $.easing[$.easing.def](e, t, n, a, u)
	},
	easeInQuad: function (e, t, n, a, u) {
		return a * (t /= u) * t + n
	},
	easeOutQuad: function (e, t, n, a, u) {
		return - a * (t /= u) * (t - 2) + n
	},
	easeInOutQuad: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? a / 2 * t * t + n : - a / 2 * (--t * (t - 2) - 1) + n
	},
	easeInCubic: function (e, t, n, a, u) {
		return a * (t /= u) * t * t + n
	},
	easeOutCubic: function (e, t, n, a, u) {
		return a * ((t = t / u - 1) * t * t + 1) + n
	},
	easeInOutCubic: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? a / 2 * t * t * t + n : a / 2 * ((t -= 2) * t * t + 2) + n
	},
	easeInQuart: function (e, t, n, a, u) {
		return a * (t /= u) * t * t * t + n
	},
	easeOutQuart: function (e, t, n, a, u) {
		return - a * ((t = t / u - 1) * t * t * t - 1) + n
	},
	easeInOutQuart: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? a / 2 * t * t * t * t + n : - a / 2 * ((t -= 2) * t * t * t - 2) + n
	},
	easeInQuint: function (e, t, n, a, u) {
		return a * (t /= u) * t * t * t * t + n
	},
	easeOutQuint: function (e, t, n, a, u) {
		return a * ((t = t / u - 1) * t * t * t * t + 1) + n
	},
	easeInOutQuint: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? a / 2 * t * t * t * t * t + n : a / 2 * ((t -= 2) * t * t * t * t + 2) + n
	},
	easeInSine: function (e, t, n, a, u) {
		return - a * Math.cos(t / u * (Math.PI / 2)) + a + n
	},
	easeOutSine: function (e, t, n, a, u) {
		return a * Math.sin(t / u * (Math.PI / 2)) + n
	},
	easeInOutSine: function (e, t, n, a, u) {
		return - a / 2 * (Math.cos(Math.PI * t / u) - 1) + n
	},
	easeInExpo: function (e, t, n, a, u) {
		return 0 == t ? n : a * Math.pow(2, 10 * (t / u - 1)) + n
	},
	easeOutExpo: function (e, t, n, a, u) {
		return t == u ? n + a : a * (1 - Math.pow(2, - 10 * t / u)) + n
	},
	easeInOutExpo: function (e, t, n, a, u) {
		return 0 == t ? n : t == u ? n + a : (t /= u / 2) < 1 ? a / 2 * Math.pow(2, 10 * (t - 1)) + n : a / 2 * (2 - Math.pow(2, - 10 * --t)) + n
	},
	easeInCirc: function (e, t, n, a, u) {
		return - a * (Math.sqrt(1 - (t /= u) * t) - 1) + n
	},
	easeOutCirc: function (e, t, n, a, u) {
		return a * Math.sqrt(1 - (t = t / u - 1) * t) + n
	},
	easeInOutCirc: function (e, t, n, a, u) {
		return (t /= u / 2) < 1 ? - a / 2 * (Math.sqrt(1 - t * t) - 1) + n : a / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
	},
	easeInElastic: function (e, t, n, a, u) {
		var o = 1.70158,
		r = 0,
		i = a;
		if (0 == t) return n;
		if (1 == (t /= u)) return n + a;
		if (r || (r = 0.3 * u), i < Math.abs(a)) {
			i = a;
			o = r / 4
		} else o = r / (2 * Math.PI) * Math.asin(a / i);
		return - i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) + n
	},
	easeOutElastic: function (e, t, n, a, u) {
		var o = 1.70158,
		r = 0,
		i = a;
		if (0 == t) return n;
		if (1 == (t /= u)) return n + a;
		if (r || (r = 0.3 * u), i < Math.abs(a)) {
			i = a;
			o = r / 4
		} else o = r / (2 * Math.PI) * Math.asin(a / i);
		return i * Math.pow(2, - 10 * t) * Math.sin((t * u - o) * (2 * Math.PI) / r) + a + n
	},
	easeInOutElastic: function (e, t, n, a, u) {
		var o = 1.70158,
		r = 0,
		i = a;
		if (0 == t) return n;
		if (2 == (t /= u / 2)) return n + a;
		if (r || (r = u * (0.3 * 1.5)), i < Math.abs(a)) {
			i = a;
			o = r / 4
		} else o = r / (2 * Math.PI) * Math.asin(a / i);
		return t < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) * - 0.5 + n : i * Math.pow(2, - 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) * 0.5 + a + n
	},
	easeInBack: function (e, t, n, a, u, o) {
		return void 0 == o && (o = 1.70158),
		a * (t /= u) * t * ((o + 1) * t - o) + n
	},
	easeOutBack: function (e, t, n, a, u, o) {
		return void 0 == o && (o = 1.70158),
		a * ((t = t / u - 1) * t * ((o + 1) * t + o) + 1) + n
	},
	easeInOutBack: function (e, t, n, a, u, o) {
		return void 0 == o && (o = 1.70158),
		(t /= u / 2) < 1 ? a / 2 * (t * t * ((1 + (o *= 1.525)) * t - o)) + n : a / 2 * ((t -= 2) * t * ((1 + (o *= 1.525)) * t + o) + 2) + n
	},
	easeInBounce: function (e, t, n, a, u) {
		return a - $.easing.easeOutBounce(e, u - t, 0, a, u) + n
	},
	easeOutBounce: function (e, t, n, a, u) {
		return (t /= u) < 1 / 2.75 ? a * (7.5625 * t * t) + n : t < 2 / 2.75 ? a * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + n : t < 2.5 / 2.75 ? a * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + n : a * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + n
	},
	easeInOutBounce: function (e, t, n, a, u) {
		return t < u / 2 ? 0.5 * $.easing.easeInBounce(e, 2 * t, 0, a, u) + n : 0.5 * $.easing.easeOutBounce(e, 2 * t - u, 0, a, u) + 0.5 * a + n
	}
});
