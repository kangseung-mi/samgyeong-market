/**
* 리뷰읽기(/board/review/read.html)
* 제작 : 웹퍼블릭(http://webpublic.co.kr)
* 버전 : 1.1
* 최종업데이트 : 2020.08.04
* 웹퍼블릭에서 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/

$(window).load(function(){
	ReadReview.load();
});


window.onpageshow = function(e) {
	if ( e.persisted || (window.performance && window.performance.navigation.type == 2)) {
		$('.open-review', parent.document).trigger('click');
	}
}

jQuery11(window).on('popstate', function(){
	$('.open-review', parent.document).trigger('click');
});

$(document).ready(function(){
	ReadReview.init();
	history.pushState({}, '', '');
	$('body').backDetect(function(){
		$('.open-review', parent.document).trigger('click');
	});
});
