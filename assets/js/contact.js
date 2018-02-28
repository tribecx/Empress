//jQuery time
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

