
// 카카오톡 상품공유
// http://webgood.co.kr/board/free/read.html?no=41338&board_no=3 내용을 보시고 자바스크립트 코드를 생성해주세요.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

Kakao.init('ac240304ad916f6273ded78955bb34f7'); // 좌측 따옴표 안에 고객님의 자바스크립트 코드를 넣어주세요.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 이하 수정금지
// 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
Kakao.Link.createDefaultButton({
    container: '#kakao-link-btn',
    objectType: 'feed',
    content: {
        title: document.title,
        description:
        $jq('meta[name=description]').attr('content') ||
        $jq('meta[name=keywords]').attr('content'),
        imageUrl: $jq('meta[property="og:image"]').attr('content'),
        link: {
            webUrl: document.location.href,
            mobileWebUrl: document.location.href,
        },
    },
    social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
    },
    buttons: [
        {
            title: '열기',
            link: {
                mobileWebUrl: document.location.href,
                webUrl: document.location.href,
            },
        },
    ],
});



// 구매토글
$(document).ready(function() {
    var $body = $('body');
    var $buy_wrapper = $('.buy-wrapper');
    
    $('.btn-down-wrapper, .bg-buy-wrapper').click(function() {
        //$newAt('.buy-scroll-box').scrollbar('destroy');
        if(tl_isMobile()) {
        } else {
        	$jq('.buy-scroll-box').mCustomScrollbar("destroy");
        }
        $jq('.buy-scroll-box').removeClass('scrollbar_box');
        $buy_wrapper.addClass('down');
        setTimeout(function() {
        	$body.removeClass('bottom-on');
        	$buy_wrapper.removeClass('down');
        },400); //시간은 .buy-wrapper.down transition 시간에 맞춘다
        setTimeout(function() {
            $('.detailArea').attr('style', null);
        },1000);
    });
    
    var btop = $buy_wrapper.offset().top + $buy_wrapper.height(); //스크롤 되면서 fixed로 전환되는 값이 있어면 추감한다.
    $(window).resize(function() {
 		if(!$body.hasClass('bottom-on')) {
    		btop = $buy_wrapper.offset().top + $buy_wrapper.height();
    	}
    });
    
    $(window).scroll(function() {
        
        if(!$body.hasClass('bottom-on')) {
    		btop = $buy_wrapper.offset().top + $buy_wrapper.height();
    	}
        
    	if(btop < $(window).scrollTop()) {
        	$body.addClass('bbo-on');
        } else {
        	$body.removeClass('bbo-on');
        }
        
        if($body.hasClass('bottom-on')) {
        	if(btop + 100 > $(window).scrollTop()) {
                $('.btn-down-wrapper').trigger('click');
            }
        }
    });
    
    $('.additional .toggle').click(function() {
    	if(!$('body').hasClass('bottom-on')) {
            setTimeout(function() {
    			btop = $buy_wrapper.offset().top + $buy_wrapper.height();
            },50);
    	}
    });
    
    $('.btn-buy-open').click(function() {
        
        //scroll
        //$jq('.buy-scroll-box').addClass('scrollbar_box').scrollbar({'disableBodyScroll':true});
        
        if(tl_isMobile()) {
           	$jq('.buy-scroll-box').addClass('scrollbar_box').css({'overflow-y':'auto'});
        } else {
            $jq('.buy-scroll-box').addClass('scrollbar_box').mCustomScrollbar({
                theme:"dark",
                mouseWheel:{ scrollAmount: 700 }
            });
        }
        
    	$('.detailArea').css({'min-height':$('.detailArea').height()+'px'});
        $('body').addClass('bottom-on');
        var bh = $('.btn-down-wrapper').height();
    	$('.btn-down-wrapper').css('top', '-' +bh+ 'px');
        
    });
});



// 상품이미지 슬라이드
//$jq(function() {
    if ($jq('.listImg ul>li')[0] && $jq('.listImg ul>li').length >= 1) {
        var $box = $jq('#big_img_box');
        var one_big_img = $box.data('one_big_img');
        var big_img_html = '';
        var $imgs = $jq('.listImg ul>li>img');
        $imgs.each(function (idx, el) {
            var $img = $jq(this);
            var thumb = $img.attr('src');
            var src = thumb.replace('/small/', '/big/');
            if($imgs.length == 1 || idx == 0) src = one_big_img;
            big_img_html += '<div data-thumb="' + thumb + '" data-src="' + src + '"><img src="' + src + '" class="BigImage" alt="" ></div>';
            $box.html(big_img_html);
        });
        $jq('.listImg,.thumbnail').hide();
        $box.lightSlider({
            gallery:true,
            item:1,
            loop:true,
            thumbItem:5,
            slideMargin:0,
            enableDrag:true,
            currentPagerPosition:'left',
        });
    }
//});



// 상세페이지 유튜브추가시 가로 100프로 맞추기
$('#prdDetailContent iframe').wrap('<div class="youtube_wrap"></div>')
