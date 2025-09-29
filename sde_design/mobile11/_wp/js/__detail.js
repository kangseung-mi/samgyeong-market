$(document).ready(function(){

	// 할인율 표시
	var price = $('#discountRate').data('price');	// 판매가
	var customPrice = $('#discountRate').data('custom-price'); // 소비자가


	if (!jQuery11.isNumeric(price)) {
		price = 0;
	}

	if (!jQuery11.isNumeric(customPrice)) {
		customPrice = parseInt(customPrice.replace(/[^0-9]/g,""));
	}else{
		customPrice = 0;
	}

	var discountRate = Math.round((customPrice - price) / customPrice * 100);

	if (discountRate < 0 || !jQuery11.isNumeric(discountRate)){
		discountRate = 0;
	}

	if (discountRate == 0){
		$('#discountRate').remove();
	}else{
		$('#discountRate strong').text(discountRate);

	}

	var isMode = 'review'; // 초기 설정 "리뷰보기"

	// 리뷰보기 클릭 시
	$('.bt-review').click(function(){
		if (isMode == 'detail'){
			gotoTab('prdDetailAnchor');
			$('.bt-review p').text('리뷰 보기');
			$('.bt-review .count').show();
			isMode = 'review';
		}else{
			gotoTab('prdReviewAnchor');
			$('.bt-review p').text('상세 보기');
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
//	if ($('.allPrdOption .prdOption .xans-product-option select').length <= 0){
//		$('.dummyOptBox.optionShow').remove();
//	}else{
//		$('.allPrdOption .prdOption .xans-product-option select').each(function(i){
//			var self = this;
//			var optName = $(this).closest('tr').children('th').text();
//			//$(this).find('option:eq(0)').text(optName + ' 선택');
//			$(this).find('option:eq(0)').text('옵션선택');
//
//			jQuery11('.cloneOptionBox').append('<li class="option'+i+'"></li>').promise().done(function(){
//				$('.cloneOptionBox li.option'+i).append(self);
//			});
//
//			jQuery11('.cloneOptionTextBox').append('<li class="optionText'+i+'"></li>').promise().done(function(){
//				$('.cloneOptionTextBox li.optionText'+i).append(optName);
//			});
//		});
//	}

//	$('.optionShow').click(function(){
//		if ($('.cloneOptionBox').is(':visible')){
//			$('.cloneOptionBox').hide();
//			$('.optionShow').removeClass('active');
//		}else{
//			$('.cloneOptionBox').show();
//			$('.optionShow').addClass('active');
//		}
//	});

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


	$(window).scroll(function(){
		// 오른쪽 카카오톡 상담 상세정보 탭 이하로 내려갈 경우 노출 여부 설정
		var detailTop = $('.wp-prd-detail').offset().top;
		var scrollBtm = ($(this).scrollTop() + $(window).height()) - parseInt($('.side-sns').css('bottom'));

		if (scrollBtm > detailTop){
			$('.side-sns, .side-move').fadeIn();
		}else{
			$('.side-sns, .side-move').hide();
		}
	});

//	$('.ec-base-tab a').click(function(e){
//		e.preventDefault();
//		var name = $(this).attr('href').split('#')[1];
//		gotoTab(name);
//	});

	function gotoTab(name){
		window.location.hash = '#'+name;
	}
});