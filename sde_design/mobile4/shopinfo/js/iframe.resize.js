$(document).ready(function(){
    var iframeResize = function(){
        var headerSpace = $('#header').outerHeight() + $('#tbanner').outerHeight() + $('.gnb_f').outerHeight();
        $('#fpFrame').attr('style', `height:calc(100vh - (${headerSpace}px - 2px))`);
    }
    iframeResize();
    
    $(window).resize(function(){
    	iframeResize();
    });
});