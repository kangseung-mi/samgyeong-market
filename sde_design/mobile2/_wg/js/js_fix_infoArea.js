$(function(){
    var fix_info = $("#fix_infoArea").offset().top;
    $(window).scroll(function(){
        if($(window).scrollTop() > fix_info+1000) {
         $('#fix_infoArea').addClass('fixed');
        }
        else {
         $('#fix_infoArea').removeClass('fixed');
        }
    });
});

$(function(){
    $(".view_infoArea").click(function(){
        $("#fix_infoArea").toggleClass("on");
    });
});
