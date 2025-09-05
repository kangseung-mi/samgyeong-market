/**
* 상단 배너 플러그인
* 제작 : 웹퍼블릭(http://webpublic.co.kr)
* 버전 : 2.0
* 최종업데이트 : 2020.10.20
* 디자인퍼블릭에서 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/
$(document).ready(function(){
	if (readCookie('is_tbanner') != "T"){
		$('#tbanner').css('visibility','visible');
		var tbanner = new Swiper('#tbanner',{
			speed: 500,
			autoplay : {
				delay:3000,
			},
			loop:true,
			grabCursor: true,
		});

		jQuery11(document).on('click','#tbanner .close',function(e){
			e.preventDefault();
			jQuery11('#tbanner').stop(true,true).animate({height:0},0).promise().done(function(){
				$('#contents').css('marginTop',$('#header .logo-wrap').height());
			});
			createCookie('is_tbanner', 'T');
		});
	}else{
		$('#tbanner').remove();
	}
});
