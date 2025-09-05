$(document).ready(function(){
	// 카테고리
	$('#gnb .cate-toggle').click(function(){
		$('#gnb .all-cate-box').slideToggle('fast','linear');
	});

	var cate_swiper = new Swiper('.cate-swiper-container',{
		slidesPerView: "auto",
		freeMode:true,
		on: {
			init : function(){
				$('#gnb .cate-mask-left').fadeOut('fast');
			},
			fromEdge : function(){
				$('#gnb .cate-mask-left, #gnb .cate-mask-right').fadeIn('fast');
			},
			reachBeginning: function () {
				$('#gnb .cate-mask-left').fadeOut('fast');
			},
			reachEnd : function(){
				$('#gnb .cate-mask-right').fadeOut('fast');
			},
		}
	});

	topAreaFixed($(window).scrollTop());

	/* footer */
		// 우측하단 죄상단 이동
		$('.bt_scroll .bt_top').click(function(){
			pageScroll('up');
		});

		// 우측하단 죄하단 이동
		$('.bt_scroll .bt_btm').click(function(){
			pageScroll('down');
	});

	/* side */
    // 커뮤니티 토글
    $('.commu').click(function(){
        $(this).toggleClass('active');
        $('.slideSubMenu2').toggle();
    });
    
    Object.observe($M.oModuleLoading, function(changes) {
        if (changes[0].type == 'update' && $('#main').length > 0){
            var t = '.xans-product-listmain-' + (parseInt(changes[0].name) - 1);
            discountRate(t);
        }else{
        	discountRate();
        }
    });
    
    discountRate();
});

/*******************************************************************************************/
function pageScroll(d){
	if (d == 'up') {
		$('html, body').stop(true).animate({scrollTop:0}, 'slow');
	} else if (d == 'down') {
		var btmTop = $(document).height() - $(window).height();
		$('html, body').stop(true).animate({scrollTop:btmTop}, 'slow');
	}
}

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

// 상세페이지, 리뷰목록 체크
function isReviewGridPage(){
	if ($('meta[name="path_role"]').attr('content') == 'PRODUCT_DETAIL'
		|| location.pathname.indexOf('/review/list') > -1){
		return true;
	}else{
		return false;
	}
}

function topAreaFixed(current_top){
	// topArea 하단에 스크롤 TOP이 위치할 경우 fixed
	if ($('#topArea').offset()) {
		if(current_top > $('#topArea').offset().top + $('#topArea').height()){
			if (!$('#topArea').hasClass('fixed')) {
				jQuery11('#topArea').addClass('fixed');
			}
		}else{
			jQuery11('#topArea').removeClass('fixed');
		}
	}
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

$(window).scroll(function(){
	var current_top = parseInt($(this).scrollTop());
	topAreaFixed(current_top);
});


$(document).ready(function(){
	// 리뷰 그리드 설정
	if (isReviewGridPage()){
		if (readCookie('gridType')){
			$('.gridType dd').each(function(){
				$(this).removeClass('selected');
			});
			$('.gridType dd').each(function(){
				if ($(this).hasClass('g'+readCookie('gridType'))){
					$(this).addClass('selected');
				}
			});

			var target = $('.gridType').data('target');
			var grids = ['grid0', 'grid1', 'grid2', 'grid3', 'grid4'];
			$(target).removeClass(grids.join(' '));
			$(target).addClass('grid'+readCookie('gridType'));
		}
	}
});


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
        if (isReviewGridPage()) createCookie('gridType', 0);
	}

	if (li.hasClass('g1')){
		$prdList.addClass(grids[1]);
        if (isReviewGridPage()) createCookie('gridType', 1);
	}

	if (li.hasClass('g2')){
		$prdList.addClass(grids[2]);
        if (isReviewGridPage()) createCookie('gridType', 2);
	}

	if (li.hasClass('g3')){
		$prdList.addClass(grids[3]);
        if (isReviewGridPage()) createCookie('gridType', 3);
	}

	if (li.hasClass('g4')){
		$prdList.addClass(grids[4]);
        if (isReviewGridPage()) createCookie('gridType', 4);
	}
});
