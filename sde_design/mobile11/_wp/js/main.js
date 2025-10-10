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
    
   // 브랜드 바로가기: 한 줄에 2개, 배너 하단 컨트롤 UI 사용
var brandSwiper = new Swiper('.main_category_wrap .swiper-container', {
	slidesPerView: 2,          // ✅ 한 줄에 2개
	spaceBetween: 16,
	speed: 400,
	loop: false,
	navigation: {
	  // HTML에서 컨트롤 래퍼가 .banner-controls 인 경우
	  prevEl: '.main_category_wrap .banner-controls .swiper-button-prev',
	  nextEl: '.main_category_wrap .banner-controls .swiper-button-next',
	  // 만약 .brand-controls 를 쓰면 위 두 줄 대신 아래 두 줄 사용:
	  // prevEl: '.main_category_wrap .brand-controls .swiper-button-prev',
	  // nextEl: '.main_category_wrap .brand-controls .swiper-button-next',
	},
	pagination: {
	  // 배너와 동일한 숫자형(2/6)
	  el: '.main_category_wrap .banner-controls .swiper-pagination',
	  // .brand-controls 를 쓰면 위 한 줄 대신:
	  // el: '.main_category_wrap .brand-controls .swiper-pagination',
	  type: 'fraction',
	  renderFraction: function (currentClass, totalClass) {
		return '<span class="' + currentClass + '"></span>' +
			   ' / ' +
			   '<span class="' + totalClass + '"></span>';
	  }
	}
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