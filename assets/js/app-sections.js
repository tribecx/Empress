$(document).ready(function() {
  menu();
  menuPosition();
  changeSection();
  dropDown();
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

function changeSection() {
  $('.option').each(function(index, element) {
    $(element).on('click', function() {
      $('.option').removeClass('active');
      $('.info').removeClass('active');
      $(this).addClass('active');
      $('.info:eq('+index+')').addClass('active');

      $('.info').fadeOut('fast').promise().done(function() {
        $('.info:eq('+index+')').fadeIn('fast');
      });
    });
  });
}

function dropDown() {
  $('.info-drop').each(function(index, element) {
    $(element).on('click', function() {
      if ($('.info-down:eq('+index+')').hasClass('visible')) {
        $(this).children('.dropdown-state').replaceWith('(+)');
      }

      $('.info-down:eq('+index+')').toggleClass('visible');
      $(this).children('.dropdown-state').replaceWith('(-)');
    });
  });
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
