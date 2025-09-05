$(document).ready(function(){
    setTimeout(function(){
        $('#wrapper').removeClass('loading').css({
        	visibility:'visible',
            opacity:1,
        });
        $('.mul13').addClass('inactive');
    },400);
    
    jQuery11(document).on('transitionend','.mul13',function(){
        jQuery11(this).remove();
    });
});