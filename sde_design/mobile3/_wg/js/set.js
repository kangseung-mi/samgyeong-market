!(function(){
    var v={};
    var a={};
    var p={};

    

    // 네이버톡톡
    // https://partner.talk.naver.com/ 에서 가입해주시고, 가입후 계정관리에 들어가보시면 [ talk.naver.com/코드 ] 확인이 가능하십니다. 11번줄의 주소를 변경해주세요.
    // 아래의 http://... 라고 기재된 곳의 코드를 교체해주시면 되겠습니다.
    a.naverTalk = "http://talk.naver.com/코드";


    
    // 카카오톡 채널
    // https://center-pf.kakao.com/ 에서 로그인후 카카오톡 채널 관리자센터에 들어가신 뒤 좌측 [ 홍보하기 ] 메뉴 클릭후 가입하신 [ 홈 URL ] 을 복사하셔서 아래의 18번줄의 주소를 변경해주세요.
    // p.kakaoCh = "https://pf.kakao.com/_AsBxgxd"; 이런 형태로 들어가면 되겠습니다.
    a.kakaoCh = "https://pf.kakao.com/코드";
    
    
    
// 이하 내용 절대 수정금지 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function DB_winOpen(_url,_win,_width,_height){
        window.open(_url,_win,'width='+_width+',height='+_height+',scrollbars=yes');
    };
	for(key in v){$('.v_'+key).text(eval('v.'+key));}; //위에 설정한 text를 해당 엘리먼트에 적용시키는 코드
    for(key in a){$('.a_'+key).attr('href',eval('a.'+key));}; //위에 설정한 링크값을 해당 엘리먼트에 적용시키는 코드
    for(key in p){       
		$('.p_'+key).click(function(){
	       var link = $(this).attr("class"); // 해당 class 명을 가져온다.
           var beforeStr = link; 
		   var afterStr  = beforeStr.split(" "); // 다중 클래스 에서 공백을 기준으로 분기처리 
		   var pop_name  = afterStr[0]; // 첫번째 class명을 가져온다.
		   var str_text  = pop_name;
		   var ch_name   = str_text.replace( "_", "."); //위쪽에 선언한 변수네임은 . 으로 명시되어 class명의 _ 를 -> . 으로 변환시킨다.
		   var attr=$(this).attr('data-popup').split(',');
		   DB_winOpen(eval(ch_name),attr[1],attr[2],attr[3]);
		});
	};
})();