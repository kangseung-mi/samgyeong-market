/**
 * WEBPULIC COMMON SCRIPT
*/

$(window).scroll(function(){
	var scrollTop = parseInt($(this).scrollTop());

	if (!$('#prdDetail').length > 0)
	{
		var innerTop = $('#header .cate-wrap').offset().top;
		if (scrollTop > innerTop){
			if (!$('#header').hasClass('fixed')) {
				$('#header').addClass('fixed');
				var logoWidth = $('#header .cate-wrap .logo-img img').width();
				$('#header .cate-wrap .logo-img').css('marginRight',50);
				$('#header .cate-wrap .logo-img').animate({
					width:logoWidth,
					}, 300,
				function(){
					$('#header .cate-wrap .logo-img').css('visibility','visible').animate({
						opacity:1,
					}, 600);
				});
			}
		}else{
			if ($('#header').hasClass('fixed')) {
				$('#header').removeClass('fixed');
				$('#header .cate-wrap .logo-img').stop().css({
					width : 0,
					marginRight : 0,
					opacity:0,
					visibility:'hidden',
				});
			}
		}
	}
});

$(document).ready(function(){

	copyright();
    
    let $ = jQuery11;
    
    // 검색창 자동완성 끄기
    $('#keyword').attr('autocomplete','off');

	// 리뷰 그리드 설정
	if (isReviewGridPage()){
		if (readCookie('gridTypePC')){
			$('.gridType dd').each(function(){
				$(this).removeClass('selected');
			});
			$('.gridType dd').each(function(){
				if ($(this).hasClass('g'+readCookie('gridTypePC'))){
					$(this).addClass('selected');
				}
			});

			var target = $('.gridType').data('target');
			var grids = ['grid0', 'grid1', 'grid2', 'grid3', 'grid4'];
			$(target).removeClass(grids.join(' '));
			$(target).addClass('grid'+readCookie('gridTypePC'));
		}
	}

	// 카테고리 경로 재설정
	$('.cate-override a').each(function(){
		var _self = $(this);
		var cateNo = getQueryStringUrl('cate_no',$(this).attr('href'));

		if (cateNo){
			$.each(setLink,function(i,v){
				if (parseInt(cateNo) == parseInt(i)){
					_self.attr('href',v);
				}
			});
		}
	});

	// 리뷰 경로 재설정
	$('.boardlink a').each(function(){
		var href = $(this).attr('href');
		if (href.indexOf('?') > -1){
			if (getQueryStringUrl('board_no',href) == '4'){
				$(this).attr('href', href.replace('/product/', '/review/'));
			}
		}
	});
});

/************************************************************************************************************/

function copyright() {
	if($("body").size) {
		if($("body").attr("id") == "popup") { return ; }
		style = 'padding:5px 10px; font-family:Verdana; font-size:11px; background:#eee; color: #555; border-radius:5px;font-style:italic';
		console.log('%c ** DESIGNED BY WEBPUBLIC (https://webpublic.co.kr) **', style);
	}
}

function getQueryStringUrl(paramName, url) {
	if (url){
		var sURL = url;
	}else{
		var sURL = window.document.URL.toString();
	}

	if (sURL.indexOf("?") > 0)
	{
		var arrParams = sURL.split("?");
		var arrURLParams = arrParams[1].split("&");
		var arrParamNames = new Array(arrURLParams.length);
		var arrParamValues = new Array(arrURLParams.length);
		var i = 0;

		for (i=0;i<arrURLParams.length;i++)
		{
			var sParam =  arrURLParams[i].split("=");
			arrParamNames[i] = sParam[0];
			if (sParam[1] != "")
				arrParamValues[i] = unescape(sParam[1]);
			else
				arrParamValues[i] = "No Value";
		}

		for (i=0;i<arrURLParams.length;i++)
		{
			if(arrParamNames[i] == paramName){
				return arrParamValues[i];
			 }
		}

		return null;
	}
};

function createCookie(name, value, days) {
	var expires;

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = escape(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

// 할인율
var discountRate = function(t, name){
	if (!t) t = '';
	if (!name) name = '.discount_rate';
	$(t + ' .custom').each(function(){
		var price = $(this).text().replace(/[^0-9]/g,'');
		price = parseFloat(price);

		if (price > 0) $(this).show();
	});

	$(t + ' ' + name).each(function(){
		var custom_price = parseInt($(this).attr('data-prod-custom').replace(/[^0-9]/g,''));
		var prod_price = parseInt($(this).attr('data-prod-price').replace(/[^0-9]/g,''));

		var rate = 0;
		if (!isNaN(custom_price) && !isNaN(prod_price)) {
			rate = Math.round((custom_price - prod_price) / custom_price * 100);
		}
		$(this).text(rate + '');

		var $ds = $(this);

		$(this).parent().find('.spec li').each(function(){
			if ( $(this).find('.title span').text().trim() == '판매가' ){
				$(this).append($ds);
			}
		});
		if (rate <= 0 || isNaN(rate)){
			$(this).hide();
		}else{
			$(this).show();
		}
	});
}

function pageScroll(d){
	if($('html, body').is(':animated')){return};

	if (d == 'up') {
		$('html, body').stop().animate({scrollTop:0}, 'slow');
	} else if (d == 'down') {
		var btmTop = $(document).height() - $(window).height();
		$('html, body').stop().animate({scrollTop:btmTop}, 'slow');
	}
}
// select wrapping
//$('select').wrap('<div class="selectbox"></div>');


// 상세페이지, 리뷰목록 체크
function isReviewGridPage(){
	if ($('meta[name="path_role"]').attr('content') == 'PRODUCT_DETAIL'
		|| location.pathname.indexOf('/review/list') > -1){
		return true;
	}else{
		return false;
	}
}


jQuery11(document).on('click','.gridType dd a',function(){
    var li = $(this).parent();
	var item = li.siblings();
	var target = $(this).closest('dl').data('target');

	if (target){
		if ($(target).length == 0) return;
	}else{
		return;
	}

	$(item).each(function(){
		$(this).removeClass('selected');
	});

	li.addClass('selected');

	var $prdList = $(target);
	var grids = ['grid0', 'grid1', 'grid2', 'grid3', 'grid4'];

	$prdList.removeClass(grids.join(' '));

	if (li.hasClass('g0')){
		$prdList.addClass(grids[0]);
        if (isReviewGridPage()) createCookie('gridTypePC', 0);
	}

	if (li.hasClass('g1')){
		$prdList.addClass(grids[1]);
        if (isReviewGridPage()) createCookie('gridTypePC', 1);
	}

	if (li.hasClass('g2')){
		$prdList.addClass(grids[2]);
        if (isReviewGridPage()) createCookie('gridTypePC', 2);
	}

	if (li.hasClass('g3')){
		$prdList.addClass(grids[3]);
        if (isReviewGridPage()) createCookie('gridTypePC', 3);
	}

	if (li.hasClass('g4')){
		$prdList.addClass(grids[4]);
        if (isReviewGridPage()) createCookie('gridTypePC', 4);
	}
});

