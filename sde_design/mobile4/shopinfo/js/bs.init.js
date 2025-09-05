$(document).ready(function() {
    var isPageStarted = false;
    var $ = jQuery11;
    $('#tbanner').prependTo('#header');
	jQuery11('#fullpage').fullpage({
		verticalCentered: true,
        navigation: false,
        afterLoad : function(origin, destination, direction){
            if (destination == 1 && isPageStarted == false){
                isPageStarted = true;
                setTimeout(function(){
                    $('#section'+destination).addClass('wp-completely');
                },800);
            }else{
                $('.fp-section').removeClass('wp-completely').promise().done(function(){
                    $('#section'+destination).addClass('wp-completely')
                });
            }
        }
	});
});