/**
* 리뷰목록(/board/review/list.html)
* 제작 : 웹퍼블릭(http://webpublic.co.kr)
* 버전 : 1.0
* 최종업데이트 : 2018.06.20
* 웹퍼블릭에서 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/
$(document).ready(function(){
	ListReview.init({target:'.board-review',listType:'list',readMoreInitNum:20, useReadMore: false, readMoreLoadNum: 20, listThumbHeight : 350, useListThumbCss:false});
});