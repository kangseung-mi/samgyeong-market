
$(document).ready(function(){

	/* 상품 추가이미지 */
	var bxKeyImg = jQuery11('#bxKeyImg').bxSlider({
		onSliderLoad: function(){},
		minSlides: 4,
		maxSlides: 4,
		moveSlides:1,
		slideWidth: 152,
		slideMargin: 15,
		auto: 0,
		autoHover:false,
		speed:500,
		pause : 2500,
		pager:true,
	});

	/* 다른 분들이 함께 구매한 상품
	var bxAdditional = jQuery11('#bxAdditional').bxSlider({
		onSliderLoad: function(){},
		minSlides: 4,
		maxSlides: 4,
		moveSlides:1,
		slideWidth: 295,
		slideMargin: 10,
		auto: true,
		autoHover:false,
		speed:500,
		pause : 2500,
		pager:true,
	});*/

	/* 함께 구매하면 좋아요 */
	var bxRelation = jQuery11('#bxRelation').bxSlider({
		onSliderLoad: function(){},
		minSlides: 4,
		maxSlides: 4,
		moveSlides:1,
		slideWidth: 295,
		slideMargin: 10,
		auto: 1,
		autoHover:false,
		speed:500,
		pause : 2500,
		pager:true,
	});

	/* SNS 공유 */
	$('#pageUrl').val(decodeURIComponent(location.href));

	$('.url_copy button').click(function(){
		copyToClipboard('#pageUrl');
		$('.sns_icon .url_copy_txt').fadeIn();
	});

	$('.social_lnk .close').click(function(){
		$('.social_lnk').fadeToggle(250);
		$('.sns_icon .url_copy_txt').fadeOut(250);
	});

	$('.xans-product-detail .wp-prod-info .bt .share').click(function(){
		$('.social_lnk').fadeToggle(250);
	});

	$('.sns_icon li').click(function(e){
        e.preventDefault();
		var name = $(this).data('sns');
		shareSNS(name);
	});


	var copyToClipboard = function(element) {
		var $temp = $("<textarea></textarea>");
		$("body").append($temp);
		$temp.val($(element).val()).select();
		document.execCommand("copy");
		$temp.remove();
	}

	Kakao.init('86b54a065203b1b0c4838a5648f3135c'); // sample key
	Kakao.isInitialized();

	var shareSNS = function(name){
		switch(name){
			case 'kakaotalk':
				 Kakao.Link.sendScrap({
				  requestUrl: location.href,
				});
				break;
			case 'kakaostory':
				window.open('https://story.kakao.com/s/share?url='+encodeURIComponent(location.href));
				break;
			case 'line':
				window.open("http://line.naver.jp/R/msg/text/?" + encodeURIComponent(product_name) + " " + encodeURIComponent(location.href));
				break;
			case 'band':
				window.open("https://band.us/plugin/share?body=" + encodeURIComponent(product_name) + "&route=" + encodeURIComponent(location.href));
				break;
			case 'naver':
				window.open("http://share.naver.com/web/shareView.nhn?url=" + encodeURIComponent(location.href) + "&title=" + encodeURIComponent(product_name));
				break;
			case 'facebook':
				window.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(location.href));
				break;
			case 'twitter':
				window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(product_name) + "&url=" + encodeURIComponent(location.href));
				break;
			default:
				break;
		}
	};

    // 스크롤 업 / 다운
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 100);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if(Math.abs(lastScrollTop - st) <= delta) return;

        if (st > lastScrollTop){
            $('html').removeClass('up').addClass('down');
        } else {
            $('html').removeClass('down').addClass('up');
        }

        lastScrollTop = st;
    }

	/* 구매영역 */
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		var scrollBtm = scrollTop + $(window).height();

		var topFixedHeight = $('#prdDetail .menu-inner').height(); // header fixed height value

		// option move
		var posY = $('.xans-product-detail .infoArea').offset().top + $('.xans-product-detail .infoArea').height(); // 바로구매 버튼 bottom pos
        var returnPosY = $('.detailArea').offset().top +$('.detailArea').height(); // 상품구매영역 bottom pos

		if ($(this).scrollTop() > posY && $('html').hasClass('down')){
			if (!$('#optionBox').hasClass('active')){
				$('#optionBox').addClass('active');
                $('#optionBox').removeClass('normal');
				$('#prdDetail .wp-opt').append($('#optionBox'));
			}
		}

        if ($(this).scrollTop() < returnPosY  && $('html').hasClass('up')){
			if ($('#optionBox').hasClass('active')){
				$('#optionBox').removeClass('active');
                $('#optionBox').addClass('normal');
				$('#optionG').append($('#optionBox'));
			}
		}

		// option fixed
		if (scrollTop > $('#prdDetail > .cont').offset().top - topFixedHeight){
			$('#prdDetail').addClass('fixed');
		}else{
			$('#prdDetail').removeClass('fixed');
		}

		var areaBtmY = $('#prdDetail .wp-cont').offset().top + $('#prdDetail .wp-cont').height(); // content bottom posY
		var optHeight = $('#prdDetail .wp-opt .option_layer').height(); // height of option when fixed

		// option bottom fixed
		if (scrollTop + optHeight  > areaBtmY - topFixedHeight){
			$('#prdDetail .wp-opt').addClass('fixed');
		}else{
			$('#prdDetail .wp-opt').removeClass('fixed');
		}

		// tab menu fixed
		var menuPosY = $('#prdDetail .menu-inner').offset().top;
		if (scrollTop > menuPosY){
			$('#prdDetail .menu-inner').addClass('fixed');
		}else{
			$('#prdDetail .menu-inner').removeClass('fixed');
		}

		// tab menu selection according to scroll
		var fixedTabHeight = $('#prdDetail .menu-inner').height();
        var fixedScrollTop = scrollTop + fixedTabHeight; // 탭 고정 시 탭 기준으로 scrollTop 값 출력

        if ($('#prdDetail').offset().top < fixedScrollTop
            && $('#prdDetail').offset().top + $('#prdDetail').outerHeight() > fixedScrollTop){
            selectTab('#prdDetail');
        }else if ($('#prdReview').offset().top < fixedScrollTop
                  && $('#prdReview').offset().top + $('#prdReview').outerHeight() > fixedScrollTop){
            selectTab('#prdReview');
        }else if ($('#prdQnA').offset().top < fixedScrollTop
                  && $('#prdQnA').offset().top + $('#prdQnA').outerHeight() > fixedScrollTop){
            selectTab('#prdQnA');
        }else if ($('#prdInfo').offset().top < fixedScrollTop
                  && $('#prdInfo').offset().top + $('#prdInfo').outerHeight() > fixedScrollTop){
            selectTab('#prdInfo');
        }

	});

	var selectedTabId = ''; //현재 활성화 된 탭 id
	function selectTab(id){
		if (selectedTabId == id) return;
		$('#prdDetail .menu-inner .menu li').removeClass('selected');
		$('#prdDetail .menu-inner .menu li a').each(function(){
			if ($(this).attr('href') == id){
				$(this).closest('li').addClass('selected');
				selectedTabId = id;
				return false;
			}
		});
	}

	$('#prdDetail .menu-inner a').click(function(e){
		e.preventDefault();
		var tid = $(this).attr('href');
        $(window).scrollTop($(tid).offset().top);
        selectTab(tid);
	});
});