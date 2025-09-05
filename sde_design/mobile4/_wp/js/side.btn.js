$(document).ready(function(){
	// 사이드 버튼 스크롤에 방향에 따른 show / hide
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
			$('.side_bnr_wrap').hide();
		} else {
			$('.side_bnr_wrap').show();
		}

		lastScrollTop = st;
	}
});