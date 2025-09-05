/**
* 카테고리
* 제작 : 웹퍼블릭
* 버전 : 3.0
* 최종업데이트 : 2022.09.14
* 웹퍼블릭에서 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/
let makeSubCate = (function($){
	let json;
	let def = {
		target : '#category',
	}

	let init = function(options) {
		jQuery.extend(def, options);
		$.ajax({
			url: '/exec/front/Product/SubCategory',
			cache: false,
			dataType: 'json',
			timeout: 4000,
			async: false,
			beforeSend : function() {},
			error: function(xhr, ajaxOptions, thrownError){
				return;
			},
			success: function(data){
				/* 디자인보관함 스킨 경로 변경에 따른 상품 url 수정 */
				$(data).each(function(i,d){
					if (d.link_product_list.indexOf('/category/') > 0){
						d.design_page_url = d.link_product_list.substring(0, d.link_product_list.indexOf('/category/')) + '/' + d.design_page_url;
					}else{
						d.design_page_url = '/' + d.design_page_url;
					}
				}).promise().done(function(){
					json = data;
					makeCateMenuHtml();
					if (def.type == 'sidebar') addEvents();
				});
			}
		});
	}

	let addEvents = function(){
		$('.menu_navi .fold, #aside .btnClose, #aside .back-panel').on('click',function () {
			$('.menu_navi .fold-icon').toggleClass('active');
			$('#aside').toggleClass('active').promise().done(function(){
				if ($(this).hasClass('active')){
					$(this).fadeIn(200);
					$('html').addClass('gnb-active');
				}else{
					$(this).hide();
					$('html').removeClass('gnb-active');
				}
			});
		});

		$('#aside .toggle-cate').click(function(e){
			e.preventDefault();
			const expend_target = $(this).data('expand-target');
			if ($(`.${expend_target}`).hasClass('active')){
				$(`.${expend_target}`).stop(true,true).slideUp(300,'easeOutQuart');
				$(`.${expend_target}`).removeClass('active');
			}else{
				$(`.${expend_target}`).stop(true,true).slideDown(300,'easeOutQuart');
				$(`.${expend_target}`).addClass('active');
			}
			$(this).closest('li').toggleClass('selected');
		});
	}

	// 카테고리 메뉴 기본 html 생성
	let makeCateMenuHtml = function() {
		let result_html;

		$(def.target).find('li[data-param]').each(function(seq) {
			let $target = $(this);

			let depth_one_cate_no = getParamUrl('cate_no',$target.attr('data-param'));
			if (!depth_one_cate_no) return;

			result_html = makeCateMenuChildList(depth_one_cate_no);

			if (def.type == 'sidebar'){
				if (result_html){
					$target.append(result_html);
				}else{
					$target.find('.toggle-cate').remove();
				}
			}else{
				// 하위 분류가 없을 경우 하위분류 wrap 영역 제거
				if (!result_html){
					$target.find('.sub-category').remove();
					return;
				}
				// 있을 경우 하위 분류 html 추가
				$target.find('.sub-category').prepend('<div class="sub-category-list sub-left">'+result_html+'</div>');
			}
		});
	}

	// 카테고리 메뉴 하위 분류 생성
	let makeCateMenuChildList = function(parent_cate_no) {
		let sub_html = "";

		// 2차 분류
		if (isChildrenCate(parent_cate_no)) {
			sub_html += "<ul class='sub02 sub02_"+parent_cate_no+"'>";

			$(json).each(function(i, d2){
				if (d2.parent_cate_no == parent_cate_no) {
					let is_sub_03 = false;
					let arrow_03 = '', btn_expand_03 = '';

					if (isChildrenCate(d2.cate_no)){
						is_sub_03 = true;
						arrow_03 = 'arrow';
						if (def.type == 'sidebar') btn_expand_03 = `<span href="#none" class="toggle-cate view" data-expand-target="sub03_${d2.cate_no}"></span>`;
					}

					sub_html += '<li class="cate_no_'+d2.cate_no+' '+arrow_03+'"><a href="'+d2.design_page_url+'?cate_no='+d2.cate_no+'">'+d2.name+`</a>${btn_expand_03}`;

					// 3차 분류
					if (is_sub_03){

						sub_html += "<ul class='sub03 sub03_"+d2.cate_no+"'>";

						$(json).each(function(j, d3){

							if (d3.parent_cate_no == d2.cate_no) {
								let is_sub_04 = false;
								let arrow_04 = '', btn_expand_04 = '';

								if (isChildrenCate(d3.cate_no)){
									is_sub_04 = true;
									arrow_04 = 'arrow';
									if (def.type == 'sidebar') btn_expand_04 = `<span href="#none" class="toggle-cate view" data-expand-target="sub04_${d3.cate_no}"></span>`;
								}

								sub_html += '<li class="cate_no_'+d3.cate_no+' '+arrow_04+'"><a href="'+d2.design_page_url+'?cate_no='+d3.cate_no+'">'+d3.name+`</a>${btn_expand_04}`;

								// 4차 분류
								if (is_sub_04){

									sub_html += "<ul class='sub04 sub04_"+d3.cate_no+"'>";

									$(json).each(function(m, d4){

										if (d4.parent_cate_no == d3.cate_no){
											sub_html += '<li class="cate_no_'+d4.cate_no+'"><a href="'+d2.design_page_url+'?cate_no='+d4.cate_no+'">'+d4.name+'</a></li>';
										}
									});

									sub_html += '</ul>';
								}
								sub_html += '</li>';
							}
						});

						sub_html += '</ul>';
					}
					sub_html += '</li>';
				}
			});
			sub_html += '</ul>';

			return sub_html;
		}
	}

	// 하위 분류 존재 여부 체크
	let isChildrenCate = function(cate_no) {
		let result = false;
		$(json).each(function(i, d){
			if (d.parent_cate_no == cate_no){
				result = true;
			}
		});

		return result;
	}

	// URL 파라미터 추출
	let getParamUrl = function(sKey, url){
		if (!url) url = location.href;
		var sQueryString = url.substring(url.indexOf('?')+1);
		var aParam = {};

		if (sQueryString) {
			var aFields = sQueryString.split("&");
			var aField  = [];
			for (var i=0; i<aFields.length; i++) {
				aField = aFields[i].split('=');
				aParam[aField[0]] = aField[1];
			}
		}

		aParam.page = aParam.page ? aParam.page : 1;
		return sKey ? aParam[sKey] : aParam;
	}

	return {
		init : function(options){
			init(options);
		}
	}
})(jQuery11);

$(function(){
	makeSubCate.init({target : '#category'});
    makeSubCate.init({target : '#allCategory'});
});