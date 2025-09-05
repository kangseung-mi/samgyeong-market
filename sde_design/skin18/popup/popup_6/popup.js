jQuery1_11_1(function(){
	var main_slide = jQuery1_11_1('#pop-slide').bxSlider({
		auto: true,
		controls: false,
		autoHover:true,
		pager:false,
		speed:500,
		pause : 2000,
		adaptiveHeight: true,
		onSliderLoad : function(){
			jQuery1_11_1('#pop-slide-pager').find('li:first-child').addClass('active');
		},
		onSlideBefore : function(el, oi, ni){
			var index = jQuery1_11_1('#pop-slide-pager').find('li.active').index();
			var size = jQuery1_11_1('#pop-slide-pager').find('li').size();

			jQuery1_11_1('#pop-slide-pager').find('li').removeClass('active');

			index++;
			if (index == size) index = 0;

			jQuery1_11_1('#pop-slide-pager').find('li').eq(index).addClass('active');

			var top = jQuery1_11_1('#pop-slide-pager').find('li').eq(ni).position().top;
			var left = jQuery1_11_1('#pop-slide-pager').find('li').eq(ni).position().left;
			jQuery1_11_1('#bar').animate({'top':top,'left':left}, 300);
		}
	});

	jQuery1_11_1('#pop-slide-pager').find('li').click(function(){
		main_slide.goToSlide(jQuery1_11_1(this).attr('data-slide-index'));
		jQuery1_11_1('#pop-slide-pager').find('li').removeClass('active');
		jQuery1_11_1(this).addClass('active');
		main_slide.stopAuto();
	}).mouseleave(function(){
		main_slide.startAuto();
	});
});