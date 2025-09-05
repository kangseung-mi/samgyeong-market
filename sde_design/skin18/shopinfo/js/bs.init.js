$(document).ready(function() {
    var isPageStarted = false;
    var $ = jQuery11;
	jQuery11('#fullpage').fullpage({
		verticalCentered: false,
		navigation: true,
        navigationPosition: 'right',
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