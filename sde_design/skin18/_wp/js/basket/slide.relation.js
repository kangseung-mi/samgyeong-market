$(document).ready(function(){
	var $ = jQuery11;
	// 함께 구매하면 좋아요
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
});