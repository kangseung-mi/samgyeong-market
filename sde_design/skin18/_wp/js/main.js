jQuery11(function(){
	// MAIN SLIDER
	var bxslider1 = jQuery11('#bxslider1').bxSlider({
		onSliderLoad: function(){
			setTimeout(function(){
				$('#bxslider1 li:eq(0)').addClass('wp-completely');
			},800);
		},
		mode: 'fade',
		auto: true,
		autoHover: false,
		speed: 500,
		pause : 5000,
		adaptiveHeight: true,
		pager:true,
		onSlideBefore : function(slideEl, oldIndex, newIndex){
			$(slideEl[0]).removeClass('wp-completely');
		},
		onSlideAfter : function(slideEl, oldIndex, newIndex){
			$(slideEl[0]).addClass('wp-completely');
		}
	});

    var main_cate_swiper = new Swiper('.main_category_wrap .swiper-container', {
        on: {
            init: function () {},
        },
        navigation: {
            nextEl: '.main_category_wrap .swiper-button-next',
            prevEl: '.main_category_wrap .swiper-button-prev',
        },
        pagination: {
            el: '.main_category_wrap .swiper-pagination',
        },
        slidesPerView: 7,
        freeMode :true,
        spaceBetween: 10,
        loop: true,
    });

	var best_swiper = new Swiper('.prd-best .swiper-container', {
		on: {
			init: function () {
				$('.prd-best .section-title').append($(this.$el).find('h3').removeClass('displaynone'));
			},
		},
		slidesPerView: 3,
		spaceBetween: 0,
		scrollbar: {
			el: '.prd-best .swiper-scrollbar',
			hide: false,
            draggable : true,
		},
	});


    jQuery11('#MainBnr300 .slider').on('init', function(event, slick, direction){
        $(slick.$slides[0]).addClass('slick-selected');
    }).slick({
        centerMode: true,
        variableWidth: true,
        arrows: true,
        autoplay: 1,
        dots: true,
        infinite: true,
        draggable: true,
        pauseOnDotsHover: true,
        adaptiveHeight: true,
        speed: 300,
        autoplaySpeed: 4000,
        slidesToShow: 1,
    });

    jQuery11('#MainBnr300 .slider').on('beforeChange', function(event, slick, prevSlide, nextSlide){
        $('#MainBnr300 .slider li').removeClass('slick-selected');
        if (prevSlide > nextSlide){
        	$(slick.$slides[prevSlide]).next('li').addClass('slick-selected');
        }else if((slick.$slides.length - 1) == nextSlide && prevSlide == 0){
        	$(slick.$slides[prevSlide]).prev('li').addClass('slick-selected');
        }else{
        	$(slick.$slides[nextSlide]).addClass('slick-active');
        }
    });

    jQuery11('#MainBnr300 .slider').on('afterChange', function(event, slick, currentSlide){
        $('#MainBnr300 .slider li').removeClass('slick-selected');
    });

    jQuery11('#MainBnr300 .slider').on('init', function(event, slick){
        $(slick.$slides[0]).addClass('slick-selected');
    });

    var review_swiper = new Swiper('.main-review .swiper-container', {
        on: {
            init: function () {},
        },
        slidesPerView: 3.5,
        spaceBetween: 0,
        scrollbar: {
            el: '.main-review .swiper-scrollbar',
            hide: false,
            draggable :true,
        },
    });

   var notice_swiper = new Swiper('.main-notice .swiper-container', {
        on: {
            init: function () {},
        },
		//direction: 'vertical',
		speed : 800,
		autoplay : {
			delay:4000,
		},
		loop:true,
		slidesPerView: 1,
		navigation: {
			prevEl: '.main-notice .bt_prev',
			nextEl: '.main-notice .bt_next',
		},
    });

	var md_swiper = new Swiper('.prd-md .swiper-container', {
		on: {
			init: function () {
				$('.prd-md .section-title').append($(this.$el).find('h3').removeClass('displaynone'));
			},
		},
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		scrollbar: {
		el: '.swiper-scrollbar',
		draggable :true,
		},
		mousewheel: true,
    });

	// 할인율 표시
	discountRate();
});