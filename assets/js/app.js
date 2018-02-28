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

