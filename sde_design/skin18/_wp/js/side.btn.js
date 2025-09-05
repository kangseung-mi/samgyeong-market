$(document).ready(function(){
    // 사이드 버튼 스크롤에 방향에 따른 show / hide
    var hideLimit = 150;

    $(window).scroll(function(){
        hasScrolled();
    });

    function hasScrolled() {
        var st = $(window).scrollTop();
        if (st > hideLimit){
            $('.side_bnr_wrap').addClass('active');
        } else {
            $('.side_bnr_wrap').removeClass('active');
        }
    }

    hasScrolled();
});