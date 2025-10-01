$(document).ready(function(){
	// 메인 슬라이드
	var swiper1 = new Swiper('.mainslide',{
		speed: 500,
		autoplay : {
			delay:3000,
		},
		pagination: {
			el:'.mainslide .swiper-pagination',
			clickable: true,
			type: 'fraction', // 숫자 형태로 표시 (1/6)
		},
		navigation: {
			nextEl: '.mainslide .swiper-button-next',
			prevEl: '.mainslide .swiper-button-prev',
		},
		loop:true,
		grabCursor: true,
	});

	// best
	var addProductSwiper = new Swiper('.prd-best .ec-base-product', {
	  slidesPerView: 2.5,
	  spaceBetween: 10,
	  freeMode: true,
	});
    
    //
    var main_cate_swiper = new Swiper('.main_category_wrap .swiper-container', {
        slidesPerView: 3.5,
        freeMode :true,
        spaceBetween: 10,
        pagination: {
            el: '.main_category_wrap .swiper-pagination',
        },
        // 무한 루프 사용 시 활성화
        //loop: true,
    });

	// md추천상품
	var addProductSwiper = new Swiper('.prd-md .ec-base-product', {
	  slidesPerView: '2.5',
	  spaceBetween: 10,
	  freeMode: true,
	});

	// 배너 이벤트
	var swiper3 = new Swiper('.main_bnr_300 .swiper-container', {
		slidesPerView: 1.2,
		spaceBetween: 14,
		loop:true,
    });

    var review_swiper = new Swiper('.main-review .swiper-container', {
        on: {
            init: function () {},
        },
        slidesPerView: 2.5,
        //freemode : true,
        spaceBetween: 0,
        scrollbar: {
            el: '.main-review .swiper-scrollbar',
            hide: false,
            draggable : true,
        },
    });

   var notice_swiper = new Swiper('.main-notice .swiper-container', {
        on: {
            init: function () {},
        },
		//direction: 'vertical',
		speed : 500,
		autoplay : {
			delay:4000,
		},
		loop:true,
		slidesPerView: 1,
    });
});