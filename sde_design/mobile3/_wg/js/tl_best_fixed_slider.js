/*document.addEventListener("DOMContentLoaded", function(event) { //단위테스트 할 때   */
jQuery(function() {
    // 호출순서가 중요
    (function($) { 
        // 베스트 리뷰 선정이 없을 때 보이지 않게함
        if($('.best_review_border_wrapper .best_review_column').length == 0) {
            $('.best_review_border_wrapper').hide();
        }
        // 1. 큰이미지
        $(".best_review_border_wrapper .review_img").attr("src", function (idx, src) {
            return src.replace("/gallery/", "/")
        }); 
		// 2. 큰이미지
        $('.best_review_border_wrapper .photo_prd img').attr("src", function (idx, src) {
            return src.replace("/tiny/", "/big/")
        }); 
		// 3. 보일이미지 선택
        $('.best_review_border_wrapper .best_review_column .main_review_img').each(function() {
            if($(this).find('.photo_file').hasClass('displaynone')) {
                $(this).find('.photo_prd').removeClass('displaynone');
            }
        });
		// 4.이미지 크기 조정(cover)
        $('.best_review_border_wrapper .review_photo').each(function() {
            if(!$(this).hasClass('displaynone')) {
                var $box = $(this).parent();
                var bw = $box.width();
                var bh = $box.height();
                var iw = $(this).find('img').width();
                var ih = $(this).find('img').height();
                if(iw > 0 && ih > 0) {
                    if(iw / ih > bw / bh) {
                        $(this).find('img').css({'height': '100%'});
                    } else {
                        $(this).find('img').css({'width': '100%'});
                    }
                }
            }
        });
        
        
        // 5. 슬라이드
        /*
        $('.best_review_border').bxSlider({
            auto: true,
            autoHover: true, 
            slideSelector: '.best_review_column.xans-record-',
            minSlides:3,
            maxSlides:3,
            moveSlides:3,
            pager:false,
            infiniteLoop: true,
            slideWidth: 420,
            responsive: false
        });
        */
        
        // 6. fancybox
        $('.best_review_border_wrapper .review_pop_width').fancybox({type:'iframe', width:'100%', height:'100%', autoSize:false});
    })($newAt); // bxslider 1.8.3 부터 사용가능
});