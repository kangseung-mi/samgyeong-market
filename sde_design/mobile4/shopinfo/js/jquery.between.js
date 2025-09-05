/**
* 분류 이동
* 제작 : 웹퍼블릭(http://webpubilc.co.kr)
* 버전 : 1.2
* 최종업데이트 : 2020.06.28
* 디자인퍼블릭에서 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.

v1.2 UPDATE
- 가시영역, 센터영역 등에 들어와있는 센션을 체크할 수 있도록 수정
*/
(function($) {
	var defaults = {
		areaWrapperClass : 'wp-main-area',
		topSpace : 600,
		btmSpace : 300,
		showTestLine : false,
	}

	$.fn.between = function(options){

		if(this.length == 0) return this;

		var o = {};
		var el = this;
		var _this = this;

		// 초기화
		var _initialize = function(){
			o.settings = jQuery.extend({},defaults, options);
			o.data = {};
			makeAreaNavigation();
			navAcitved($(window).scrollTop());
		}

		// 네비 데이터 생성
		var makeAreaNavigation = function(){
			$('.'+o.settings.areaWrapperClass).each(function(index){
				++index
				$(this).addClass('area'+(index));
				o.data['area'+(index)] = {
					top : $('.'+o.settings.areaWrapperClass+'.area'+index).offset().top,
					bottom : $('.'+o.settings.areaWrapperClass+'.area'+index).offset().top + $('.'+o.settings.areaWrapperClass+'.area'+index).outerHeight(),
					outerheight : $('.'+o.settings.areaWrapperClass+'.area'+index).outerHeight(),
					height : $('.'+o.settings.areaWrapperClass+'.area'+index).height(),
				}
			});
		}

		var position = $(window).scrollTop();

		var getScrollDirection = function(){
			var scroll = $(window).scrollTop();
			if(scroll > position) {
				dr = 'DOWN';
			}else{
				dr = 'UP';
			}
			position = scroll;
			return dr;
		}

		var navAcitved = function(scrollTop){
			if(getScrollDirection() == 'UP'){
				viewAreaRange = scrollTop + o.settings.topSpace;
			}else{
				viewAreaRange = scrollTop + $(window).height() - o.settings.btmSpace;
			}
			var viewTop = scrollTop + ($('#topArea').height() - 1); // 컨텐츠 노출영역의 Top Pos
			var viewBtm = scrollTop + $(window).height(); // bottom Pos

			var index = 0;
			$.each(o.data,function(i,v){
				if ((v.top <= viewAreaRange && v.bottom > viewAreaRange) || (v.top >= viewTop && v.bottom <= viewBtm)){
					$('.area'+(index+1)).addClass('selected');
//					console.log('스크롤 업/다운 시 가상선에 걸렸거나 또는 가시영역에 완전하게 들어갔을 경우 클래스 부여');
				}

				// 따로체크
				if (v.top >= viewTop && v.bottom <= viewBtm){
//					console.log('섹션 전체내용이 가시영역에 완전히 안에 들어감',index);
				}

				if (v.bottom > viewTop && viewBtm > v.top){
//					console.log('가시영역 걸려있는 섹션', 'v.bottom:'+v.bottom, 'viewTop:'+viewTop,'v.top:'+v.top, 'viewBtm:'+viewBtm, i);
				}else{
					$('.area'+(index+1)).removeClass('selected');
				}

				index++;
			});

			// 테스트 라인 확인
			if (o.settings.showTestLine){
				if ($('.betweenTestLine').length == 0){
					$(_this).append('<div class="betweenTestLine"></div>');
				}
				$('.betweenTestLine').css({'height' : 1, 'width' : '100%', 'position':'absolute','z-index':'99999','background':'red','opacity':'0.5','top':viewAreaRange,'left':0})
			}
		}

		$(window).scroll(function(){
			navAcitved($(this).scrollTop());
		});
		_initialize();

		return this;
	};
})(jQuery);


$(window).load(function(){
	$('body').between({btmSpace :200, topSpace : 400, areaWrapperClass : 'wp-animate'});
});