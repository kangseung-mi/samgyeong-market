$(document).ready(function(){

	// 좌측 메뉴 활성화
	var pathname = location.pathname.toLowerCase();
	var activeMenuCls = null;

	switch (pathname){

		// 주문내역조회
			case '/myshop/order/list.html' :
				activeMenuCls = '.menu1';
			break;
			case '/myshop/order/list_past.html' :
				activeMenuCls = '.menu1';
			break;
			case '/myshop/order/list_old.html' :
				activeMenuCls = '.menu1';
			break;
			case '/myshop/order/detail.html' :
				activeMenuCls = '.menu1';
			break;

		// 관심상품
			case '/myshop/wish_list.html' :
				activeMenuCls = '.menu2';
			break;

		// 최근본상품
			case '/myshop/recent_view_product.html' :
				activeMenuCls = '.menu3';
			break;

		// 좋아요 상품
			case '{$myLike_href}' :
				activeMenuCls = '.menu4';
			break;



		// 회원정보수정
			case '/member/modify.html' :
				activeMenuCls = '.menu5';
			break;

        // 회원정보수정 비밀번호 체크
			case '/member/check_password.html' :
				activeMenuCls = '.menu5';
			break;

		// 할인쿠폰
			case '/myshop/coupon/coupon.html' :
				activeMenuCls = '.menu6';
			break;

		// 적립금
			case '/myshop/mileage/historylist.html' :
				activeMenuCls = '.menu7';
			break;
			case '/myshop/mileage/unavaillist.html' :
				activeMenuCls = '.menu7';
			break;
			case '/myshop/mileage/couponList.html' :
				activeMenuCls = '.menu7';
			break;

		// 예치금
			case '/myshop/deposits/historyList.html' :
				activeMenuCls = '.menu8';
			break;

		// 게시물 관리
			case '/myshop/board_list.html' :
				activeMenuCls = '.menu9';
			break;

		// 배송 주소록 관리
			case '/myshop/addr/list.html' :
				activeMenuCls = '.menu10';
			break;
			case '/myshop/addr/register.html' :
				activeMenuCls = '.menu10';
			break;
			case '/myshop/addr/modify.html' :
				activeMenuCls = '.menu10';
			break;

		// 대량구매 문의 관리
			case '/board/inquiry/list.html' :
				activeMenuCls = '.menu11';
			break;

		// 정기배송 관리
			case '/myshop/regular_delivery.html' :
				activeMenuCls = '.menu12';
			break;
			case '/myshop/regular_delivery_detail.html' :
				activeMenuCls = '.menu12';
			break;
			case '/myshop/regular_delivery_update.html' :
				activeMenuCls = '.menu12';
			break;
	}

	if (activeMenuCls){
		$('#myshopMenuList').find(activeMenuCls).addClass('active');
	}
});