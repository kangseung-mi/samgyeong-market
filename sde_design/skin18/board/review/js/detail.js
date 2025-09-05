/**
* 리뷰상세(detail.js)
* 제작 : 웹퍼블릭(http://webpublic.co.kr)
* 버전 : 1.2
* 최종업데이트 : 2022.11.02
* 웹퍼블릭에서 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/
$(function(){
	var $ = jQuery11;
	ListReview.init({target:'#use_review',listType:'list',listThumbHeight : 280, useListThumbCss:false, useReadMore:false, readMoreInitNum:100});

	// 리뷰 작성 URL
	var prod_no = iProductNo;
	var writeURL = '?product_no=' + prod_no;

	$.get('/board/review/write.html?product_no=' + prod_no, function(data){
		// 글쓰기 권한이 있을 경우
		if (data.indexOf('!DOCTYPE') > 0){
			if ($('#frmReviewWrite').data('islogin') == 'T'){
				$('#frmReviewWrite').prop('src','/board/review/write.html' + writeURL);
			}else{
				$('#frmReviewWrite').prop('src','/board/review/guest_write.html' + writeURL);
			}
			iFrameResize({log:false}, '#frmReviewWrite');
		}else{
			$('#frmReviewWrite').remove();
			$('.no-permission').removeClass('displaynone');
		}
	});
});
