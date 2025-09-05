$(document).ready(function(){
	var $ = jQuery11;
	// 전체동의 설명 토글
	$('.agreeArea').each(function(){
		var $this = $(this);
		$(this).find('.tit, .more_view').click(function(){
			$($this).toggleClass('selected');
		});
	});
});