/**
 * 카테고리 리스트 상품 정렬
 */
var aUrl = location.href.split('?');
var sQueryString = aUrl[1];

/**
 * 파라미터가 있을경우에만 처리
 */
$(document).ready(function(){
    if (sQueryString && sQueryString.indexOf('sort_method') > -1) {
        for (var i=0; i<$('#selArray option').length; i++) {
            if ($('#selArray option:eq('+i+')').val().indexOf(sQueryString) > -1) {
                $('#selArray option:eq('+i+')').attr("selected", true);
            }
        }
    }
});

$('#selArray').change(function() {
    if ($('#selArray').val()) {
        location.href=$('#selArray').val();
    }
});

function goThumg(url) {
    location.href = url+'?'+sQueryString;
}

jQuery11(document).on('click','.gridType li a',function(){
    var target = $(this).parent();
	$('.gridType li').each(function(){
		$(this).removeClass('selected');
	});

	target.addClass('selected');

	var $prdList = $('.xans-product-listnormal .prdList');
	var grids = ['grid0', 'grid1', 'grid2', 'grid3', 'grid4'];

	$prdList.removeClass(grids.join(' '));

	if (target.hasClass('g0')){
		$prdList.addClass(grids[0]);
	}

	if (target.hasClass('g1')){
		$prdList.addClass(grids[1]);
	}

	if (target.hasClass('g2')){
		$prdList.addClass(grids[2]);
	}

	if (target.hasClass('g3')){
		$prdList.addClass(grids[3]);
	}

	if (target.hasClass('g4')){
		$prdList.addClass(grids[4]);
	}
});