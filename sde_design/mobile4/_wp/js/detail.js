$(document).ready(function(){
	/*상세페이지*/

		// 다른 분들이 함께 구매한 상품
		//var addProductSwiper = new Swiper('.add-product-container', {
		//  slidesPerView: '1',
		//  spaceBetween: 5,
		//  freeMode: true,
		//});

		// 함께 구매하면 좋아요
		var addProductSwiper = new Swiper('.relation-container', {
		  slidesPerView: '2.5',
		  spaceBetween: 5,
		  freeMode: true,
		});

		// 스크롤 UP DOWN 체크
		var didScroll;
		var lastScrollTop = 0;
		var delta = 5;
		var navbarHeight = $('header').outerHeight();

		$(window).scroll(function(event){
			didScroll = true;
		});

		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 10);

		function hasScrolled() {
			var st = $(this).scrollTop();
			if (st < 150) return;
			if(Math.abs(lastScrollTop - st) <= delta) return;

			if (st > lastScrollTop && st > navbarHeight){
				$('html').removeClass('up').addClass('down');
			} else {
				$('html').removeClass('down').addClass('up');
			}

			lastScrollTop = st;
		}

		// 탑배너 비활성화 시 topArea 높이 설정
		if (readCookie('is_tbanner') == "T"){
			$('html').addClass('tbanner-off');
		}

		// 클릭 시 topArea 높이 설정
		$('#tbanner .close').click(function(){
			$('html').addClass('tbanner-off');
		});


	/* 구매 옵션 관련 */

		var isMode = 'review'; // 초기 설정 "리뷰보기"

		// 리뷰보기 클릭 시
		$('.bt-review').click(function(){
			if (isMode == 'detail'){
				$('.bt-review p').text('리뷰');
				$('#tabProduct li:eq(0) a').trigger('click');
				$('.bt-review .count').show();
				isMode = 'review';
			}else{
				$('.bt-review p').text('상세보기');
				$('#tabProduct li:eq(2) a').trigger('click');
				$('.bt-review .count').hide();
				isMode = 'detail';
			}
		});

		// 구매하기 클릭 시
		$('.wp-bt-buy').click(function(){
			$('.wp-buy-step1').hide();
			$('.wp-buy-step2').show();
			$('.allPrdOption').show();
		});

		$('.allPrdOption .allPrdOptionBtn').click(function(){
			if($('.allPrdOption').is(':visible')){
				$('.wp-buy-step1').show();
				$('.wp-buy-step2').hide();
				$('.allPrdOption').hide();
			}
		});

		// 네이버페이 클릭 시
		$('.bt-naverpay').click(function(){
			$('.npay_btn_pay').trigger('click');
		});

		// 옵션이 없을 경우 옵션선택 제거
		if ($('.allPrdOption .prdOption .xans-product-option select').length <= 0){
			$('.dummyOptBox.optionShow').remove();
		}else{
			$('.allPrdOption .prdOption .xans-product-option select').each(function(i){
				var self = this;
				var optName = $(this).closest('tr').children('th').text();
				//$(this).find('option:eq(0)').text(optName + ' 선택');
				$(this).find('option:eq(0)').text('옵션선택');

				jQuery11('.cloneOptionBox').append('<li class="option'+i+'"></li>').promise().done(function(){
					$('.cloneOptionBox li.option'+i).append(self);
				});

				jQuery11('.cloneOptionTextBox').append('<li class="optionText'+i+'"></li>').promise().done(function(){
					$('.cloneOptionTextBox li.optionText'+i).append(optName);
				});
			});
		}

		$('.optionShow').click(function(){
			if ($('.cloneOptionBox').is(':visible')){
				$('.cloneOptionBox').hide();
				$('.optionShow').removeClass('active');
			}else{
				$('.cloneOptionBox').show();
				$('.optionShow').addClass('active');
			}
		});

		// 추가상품 옵션이 없을 경우 옵션 제거
		if ($('.xans-product-addproduct ul.product > li').length <= 0){
			$('.addProdBox').remove();
		}

		$('.xans-product-addproduct ul.product > li .information').click(function(){
			var opt = $(this).closest('li').find('ul.option');
			if(opt.is(':visible')){
				opt.hide();
				$(this).removeClass('active');
			}else{
				opt.show();
				$(this).addClass('active');
			}
		});

		$('.addProdBox').click(function(){

			if ($('.xans-product-addproduct').is(':visible')){
				$('.xans-product-addproduct').hide();
				$('.addProdBox').removeClass('active');
			}else{
				$('.xans-product-addproduct').show();
				$('.addProdBox').addClass('active');
			}
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

    // 탭 활성화
    var hash = document.location.href.split('#')[1];
    if (hash == 'use_qna' || hash == 'prdQnA') {
        setTimeout(function(){
            $('a[name="use_qna"]').trigger('click');
        },0);
    }
    if (hash == 'use_review' || hash == 'prdReview') {
        setTimeout(function(){
            $('a[name="use_review"]').trigger('click');
        },0);
    }
    
    // 상세페이지 아이프레임 wrap
    $('#prdDetailContent iframe').each(function(){
        $(this).wrap('<div class="wp-iframe"></div>')
    });
});