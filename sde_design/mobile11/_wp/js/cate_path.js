$(document).ready(function(){

	// 활성화 된 카테고리 표시

	var pathname  = location.pathname;

	if (pathname  == '/' || pathname  == '/index.html'){
		$('#category li:eq(0)').addClass('selected');

	}else if(pathname.indexOf('/product/list.html') > -1){
		var cate_no = getQueryStringUrl(document.location.search.substring(1), 'cate_no');
		jQuery11('#category > li').each(function(index){
			var _this = $(this);
			var link_cate_no = getQueryStringUrl($(this).find('a').attr('href'),'cate_no');
			if (cate_no == link_cate_no) {
				$(this).addClass('selected');
			}
		})

	}else if(pathname.indexOf('/board/') > -1){
		var board_no = getQueryStringUrl(document.location.search.substring(1), 'board_no');
		console.log(board_no);
		jQuery11('#category > li').each(function(index){
			var _this = $(this);
			var link_board_no = getQueryStringUrl($(this).find('a').attr('href'),'board_no');
			if (board_no == link_board_no) {
				$(this).addClass('selected');
			}
		})
	}
});