!(function($) {
    $(document).ready(function(){
        $.easing = $newAt.easing;
        $('.coupon_popup.btn').click(function (e) {
            var $btn = $(this);
            $btn.blur();
            $('.coupon_popup.popup').bPopup({
                preLoadSelector:'.loadhtml',
                preLoadUrl:'/coupon/coupon_productdetail.html',	// 페이지주소
                zIndex:200,									// z-index
                positionStyle:'fixed',						// 고정방법
                speed:300, 									// 속도 (css transition과 동일하게 설정)
				autoClose:600000, 							// 1000 = 1초후 닫힘
                modal:true,									// 배경
                transition:'custom',
                follow: [false, false],
                openClass:'on',
                onClose: function () { $btn.removeClass('on'); $('#dCouponDetail').remove();} // 버튼 클래스에 on 삭제, 쿠폰상세내용 레이어창도 같이 닫히게
            }, function () {
                var $this = $(this);
                if (!$this.hasClass('script-on')) { //한번만 실행하기 위해 class 추가
                    if(tl_isMobile()) {
                    	$jq(this).find('.scrollbar_box').css({'overflow-y':'auto'});
                    } else {
                        $jq(this).find('.scrollbar_box').mCustomScrollbar({
                            theme: 'dark',
                            mouseWheel:{ scrollAmount: 300 }
                        });
                    }
				}
				$this.addClass('script-on');
                $btn.addClass('on');
            });
        });
        
        // 쿠폰상세내용 레이어창도 같이 닫히게
        $('.p-close.-cap2').click(function() {
            $('#dCouponDetail').remove();
        });
        /*
        $newAt('body').on('mouseenter', '#dCouponDetail', function() {
            $(this).find('a[href="#none"]').attr('onclick', "");
            $(this).find('a[href="#none"]').click(function() {
                $('.p-close.-cap2').trigger('click');
                $('#dCouponDetail').remove();
            });
        });
        */
	});
})(jQuery);