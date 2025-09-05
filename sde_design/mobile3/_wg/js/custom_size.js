
	var show_category_nos = [42,00];	//사이즈 입력이 필요한 카테고리


	//디자인변경 될수잇는 옵션테이블 아이디를 변수에 저장했습니다.
    var optionTable=$('#prdOptionTable');


    //로딩 완료후
	$( window ).ready(function() {

		//10단위, 100단위,... 등등 금액단위 옵션 숨기기

		//if(305 != iPopupProductNo && 299 != iPopupProductNo)	//iPopupProductNo는 카페24제품 번호
		
		
		//까페24 모듈을 적절히 컨트롤 하기위한 설정
		//처음 작업시에는 hide()만으로 값이 넘어갔는데 이후 시간이 지나서 카페24에서 모듈을 바꾼것 같다.
		// 바꾼것 예상은 숨기는 컨트롤은 값을 안넘기게 만듬
		//그래서 다른방법으로 처리함
		// 처리방법은 1.해당 컨트롤 내용을 복사하고 2. 해당 컨트롤 삭제, 3. <div style='position: absolute; top: -500px; left: -500px;'>해당컨트롤</div> 로 해서 안보이게 함
		//까페24에서 옵션의 컨트롤을 숨기면 값을 안넘겨서 여기는 주석처리하고 아래와 같이 값은 컨트롤을 복사후 div에 붙여넣고 div를 -500, -500으로 숨기고 현재 컨트롤은 삭제함
		
		
		
		//초기버젼 : 숨기기
		$("#product_option_id3").parent().parent().hide();	//10단위
		$("#product_option_id4").parent().parent().hide();	//100단위
		$("#product_option_id5").parent().parent().hide();	//1000단위
		$("#product_option_id6").parent().parent().hide();	//10000단위
		$("#product_option_id7").parent().parent().hide();	//100000단위
		$("#product_option_id8").parent().parent().hide();	//1000000단위
		$("#product_option_id9").parent().parent().hide();	//10000000단위
		
		$('#add_option_0').parent().parent().hide();	//가로cm * 세로cm[선택]
		
		
		/*
		//1.해당 컨트롤 내용을 복사
		var str_copy_option = '';
		str_copy_option += $("#product_option_id3").parent().html();
		str_copy_option += $("#product_option_id4").parent().html();
		str_copy_option += $("#product_option_id5").parent().html();
		str_copy_option += $("#product_option_id6").parent().html();
		str_copy_option += $("#product_option_id7").parent().html();
		str_copy_option += $("#product_option_id8").parent().html();
		str_copy_option += $("#product_option_id9").parent().html();
		str_copy_option += $("#add_option_0").parent().html();
		
		//2. 해당 컨트롤 삭제
		$("#product_option_id3").parent().parent().remove();;	//라인 삭제 : 10단위
		$("#product_option_id4").parent().parent().remove();	//라인 삭제 : 100단위
		$("#product_option_id5").parent().parent().remove();	//라인 삭제 : 1000단위
		$("#product_option_id6").parent().parent().remove();	//라인 삭제 : 10000단위
		$("#product_option_id7").parent().parent().remove();	//라인 삭제 : 100000단위
		$("#product_option_id8").parent().parent().remove();	//라인 삭제 : 1000000단위
		$("#product_option_id9").parent().parent().remove();	//라인 삭제 : 10000000단위
		
		$('#add_option_0').parent().parent().remove();	//라인 삭제 : 가로cm * 세로cm[선택]
		
		
		
		
		//3. <div style='position: absolute; top: -500px; left: -500px;'>해당컨트롤</div> 로 해서 안보이게 함
		//$(window).width(), $(window).height()
		//$("<div style='position: absolute; top: " + $(document).height() + "px; left: " + $(document).width() + "px;'>" + str_copy_option + "</div>").appendTo(optionTable);
		$("<div style='position: absolute; top: 100px; left: 100px;'>" + str_copy_option + "</div>").appendTo(optionTable);
		
		$("#product_option_id6").css("display", "block");
		$("#product_option_id6").css("visibility", "visible");
		$("#product_option_id6").show();
		*/
		
		//alert(str_copy_option);
		
		//test옵션 숨기기 : 옵션이 1개도 없으면 수량 변경시 가격이 0이되는 버그가 있어서 옵션을 추가후 숨긴다.
		$('select[id^="product_option_id"]').each(function() {
			if ("test" == $(this).attr("option_title")) {
				$(this).parent().parent().hide();
			}
		});
		
		
		//사이즈 입력 생성
		for(var i = 0; i < show_category_nos.length; i++)
		{
			console.log(iCategoryNo);
			if(iCategoryNo == show_category_nos[i])	//iCategoryNo는 카페24 카테고리 번호
			{
				//$(".tr_size").show();	//보여주기
				
				optionTable.append('<tr><th>사이즈</th><td><input type="text" id="w_cm" name="w_cm" value="" onkeyup="input_size_keyup(this);" style="width:60px;"> ㎝ x  <input type="text" id="h_cm" name="h_cm" value="" onkeyup="input_size_keyup(this);" style="width:60px;"> ㎝  = <input type="text" name="r_meter" value="1" disabled="true" style="width:70px;"> ㎡</td></tr>');                
				optionTable.append('<tr><td colspan=2 style="padding:10px 0 10px 25px;">실측 + 5cm 여분 길이를 입력해주세요.<br>사이즈를 입력하시면 결제금액이 자동으로 계산됩니다.<br>최소 주문단위는 1㎡(헤베)입니다. <br>1㎡(헤베)이하는 1제곱미터(헤베) 금액으로 주문됩니다.</td></tr>');
				
				break;
			}
		}
		
		/*
		//재질 => 시안요청을 선택해야 10, 100단위의 select에 값이 들어온다. 그전에는 값이 없다.
		//2번째 select 인 시안요청을 변경시
		//$("#product_option_id2").change(function() {
		$("#product_option_id2").bind("change", function() {
			CalculateArea();	//면적계산 처리
		});
		*/
		
		$("div .xans-product-action").find("a").each(function() {
			var str_html = $(this).clone().wrapAll('<div/>').parent().html();//자기 자신까지 포함한 HTML내용(즉, outerHTML 예전에는 ie만 outerHTML을 지원했다. 그래서 이렇게..)
			if(null != str_html && "" != str_html)
			{

				if(0 <= str_html.indexOf("product_submit"))	//product_submit() 함수가 있는경우
				{
					//입력 변수 추출
					var nPos1 = str_html.indexOf("(");	//product_submit(2, '/exec/front/order/basket/', this)
					var nPos2 = str_html.indexOf(")", nPos1);
					var param = str_html.substring(nPos1+1, nPos2);
					
					//http://www.seobangnim.com/zbxe/592179 : jquery onclick 이벤트 변경
					
					$(this).attr('onclick', '').unbind('click');	//기존 이벤트 삭제 :  1.해당 onclick 삭제, 2.해당 click 이벤트를 unbind
					
					var js_func = "my_product_submit(" + param + ");";
					var clickEvent = new Function(js_func);
					$(this).attr('onclick', '').click(clickEvent);	//신규 이벤트 등록
					
					//3. click함수를 바인드시켜줍니다. (즉 기존에 attr로 바꾸는 것 대신에 bind 함수로 감쌉니다.)
					//$(this).bind('click', function() {
					//	my_product_submit(" + param + ");
					//});
				}
			}
			str_onClick = null;
		});
		
	});


	function my_product_submit(param1, param2, param3)
	{
		//alert(param1 +', '+param2 +', '+param3);
		var is_next = false;
		
		var str_val = $('#product_option_id1 option:selected').val();
			//alert(str_val);
		if("" != str_val && typeof(str_val) != 'undefined' && "*" != str_val && "**" != str_val) {
			str_val = $('#product_option_id2 option:selected').val();
			//alert(str_val);
			
			if("" != str_val && typeof(str_val) != 'undefined' && "*" != str_val && "**" != str_val) {
				is_next = true;
				
				if( $("#w_cm").val() == "" ) {
					$("#w_cm").focus();
					alert("사이즈를 입력해주세요.");
					return false;
				} 
				if( $("#h_cm").val() == "" ) {
					$("#h_cm").focus();
					alert("사이즈를 입력해주세요.");
					return false;
				}
				
			} else {
				$('#product_option_id2').focus()
				alert("필수 옵션을 선택해주세요.");
				 return false;
			}
		} else {
			$('#product_option_id1').focus();
			alert("필수 옵션을 선택해주세요.");
			 return false;
		}
		
		if(true == is_next) {
			$("#product_option_id3").parent().parent().show();	//10단위
			$("#product_option_id4").parent().parent().show();	//100단위
			$("#product_option_id5").parent().parent().show();	//1000단위
			$("#product_option_id6").parent().parent().show();	//10000단위
			$("#product_option_id7").parent().parent().show();	//100000단위
			$("#product_option_id8").parent().parent().show();	//1000000단위
			$("#product_option_id9").parent().parent().show();	//10000000단위
			
			$('#add_option_0').parent().parent().show();	//가로cm * 세로cm[선택]
			
			product_submit(param1, param2, param3);
			
		} else {
			product_submit(param1, param2, param3);
		}
	}
	/*	http://itpsolver.com/jquery%EB%A1%9C-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%9D%B4%EB%B2%A4%ED%8A%B8event-%EB%A7%8C%EB%93%A4%EC%96%B4-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/
	http://luvstudy.tistory.com/12
	var _oldhide = $.fn.hide;
	$.fn.hide = function(speed, callback) {
		$(this).trigger('hide');
		return _oldhide.apply(this,arguments);
	}
	*/


	/*
	//재질A 옵션 변경시 가격 다시 계산
	$('#product_option_id1').bind('change', function() {
		//추가옵션의 가격 셋팅
		setMyOptionVal();
	});
	*/

	var m_Interval = null;
	var m_IntervalIdx = 0;
	//시안요청 옵션 변경시 가격 다시 계산
	$('#product_option_id2').bind('change', function() {
		//추가옵션의 가격 셋팅
		//setMyOptionVal();
		
		//setTimeout(function(){ setMyOptionVal() }, 800);	//바로 적용은 안됨, product_option_id3
		m_IntervalIdx = 0;
		m_Interval = setInterval(checkOptionVal, 250);	//바로 적용은 안됨, product_option_id3
	});

	//시안요청 값이 변경되면 판매가 재계산
	function checkOptionVal()
	{
		var sel_val = $("#product_option_id2 option:selected").val();	//2번째 시안요청의 내용
		
		if("*" == sel_val || "**" == sel_val)
		{
			clearInterval(m_Interval);	//종료
			
			setMyOptionVal();	//추가옵션의 가격 셋팅
		}
		else
		{
			if(10 > m_IntervalIdx)
			{
				if(3 < $("#product_option_id3 option").size())	//2번째 시안요청의 내용을 선택하면 product_option_id3 ~ product_option_id9까지 값이 채워진다. 그전에는 없다.
				{
					clearInterval(m_Interval);	//종료
					
					setMyOptionVal();	//추가옵션의 가격 셋팅
				}
			}
			else
			{
				clearInterval(m_Interval);	//종료
			}
			
			m_IntervalIdx++;
		}
		
		sel_val = null;
	}

	/*
	//수량
	$('#quantity').bind('propertychange change keyup paste input', function() {
		//alert(iPrice);
		//추가옵션의 가격 셋팅
		setMyOptionVal();
    });
	*/

	//필수옵션의 옵션포함한 가격
	function myGetOptionPrice()
	{
		var my_option_price = 0;
		var aStockData = new Array();
		try {
			if (typeof(option_stock_data) != 'undefined') {
				aStockData = $.parseJSON(option_stock_data);
			}
			
			$('select[id^="product_option_id1"][value!="*"] option:selected').each(function() {
				var sOptionId = $(this).val();
				if (typeof(aStockData[sOptionId]) != 'undefined') {
					my_option_price = aStockData[sOptionId].option_price;
				}
			});
			
			return my_option_price;
		} finally {
			my_option_price = null;
			aStockData = null;
		}
	}
	//추가옵션의 가격 셋팅
	function setMyOptionVal()
	{
		//면적옵션 초기화 
		//option:eq(0) = <option value="*" selected="selected">- [선택] 옵션을 선택해 주세요 - </option>
		//option:eq(1) = <option value="**">-------------------</option>
		//option:eq(2) = <option value="68">0</option> : 여기서 68은 DB번호이기에 다를수 있다.
		
		$("#product_option_id3 option:eq(2)").attr("selected", "selected");	// 10의자리 0으로 셋팅
		$("#product_option_id4 option:eq(2)").attr("selected", "selected");	// 100의자리 0으로 셋팅
		$("#product_option_id5 option:eq(2)").attr("selected", "selected");	// 1000의자리 0으로 셋팅
		$("#product_option_id6 option:eq(2)").attr("selected", "selected");	// 10000의자리 0으로 셋팅
		$("#product_option_id7 option:eq(2)").attr("selected", "selected");	// 100000의자리 0으로 셋팅
		$("#product_option_id8 option:eq(2)").attr("selected", "selected");	// 1000000의자리 0으로 셋팅
		$("#product_option_id9 option:eq(2)").attr("selected", "selected");	// 10000000의자리 0으로 셋팅
		
		
		var squareMeter = $('input[name=r_meter]').attr("value"); 	//면적 계산값
		//if(2 == squareMeter)
		//	alert(squareMeter);
		
		var myOptionPrice = myGetOptionPrice();	//필수옵션의 옵션포함 가격
		//alert(myOptionPrice);
		
		var myProductOptionPrice = parseInt(myOptionPrice) + parseInt(product_price);
		//if(2 == squareMeter)
		//	alert(myOptionPrice + ' : ' + myProductOptionPrice);
		
		var myProductOptionPricePercent = parseFloat(squareMeter) * myProductOptionPrice;
		//if(2 == squareMeter)
		//	alert(myProductOptionPricePercent);
		
		//<select id="product_option_id3" name="option3"> 쪽의 2번째 <option>이 10부터 시작해야 하는데 만일	<option value="**">-------------------</option> 이렇게 되면 3번째 부터 시작한다.
		var n_num_start = 1;
		if("**" == $("#product_option_id3 option:eq(1)").val())
		{
			n_num_start++;	//option:eq(2) = <option value="68">0</option> : 여기서 68은 DB번호이기에 다를수 있다.
			//if(2 == squareMeter)
			//	alert($("#product_option_id3").html());
		}

		if(myProductOptionPrice != myProductOptionPricePercent)
		{
			var last_num = myProductOptionPricePercent - (parseInt(myProductOptionPricePercent/10)*10);	//마지막 원단위 1의자리 숫자 구하기
			var g_my_option_price = myProductOptionPricePercent - last_num;	//마지막 원단위는 0으로 무조건 만든다.
			//alert(g_my_option_price);
			
			//var final_option_price = g_my_option_price - parseInt(product_price);	//계산된값 - 소비자가
			var final_option_price = g_my_option_price - myProductOptionPrice;	//계산된값 - (소비자가+옵션가)
			//alert(final_option_price);
			var str_final_option_price = String(final_option_price);	//문자열로 만들기
			
			var idx = 0;
			for(i=str_final_option_price.length-2 ; i>=0 ; i--)
			{
				idx++;
				n_num = parseInt(str_final_option_price.substr(i, 1));
				n_num += n_num_start;
				//alert(i + ' : ' + idx + ' :: ' + n_num);
				switch(idx)
				{
					case 1:	//10의 자리
						$("#product_option_id3 option:eq("+n_num+")").attr("selected", "selected");	// 지정된 index 값으로 select 하기
						break;
					case 2:	//100의 자리
						$("#product_option_id4 option:eq("+n_num+")").attr("selected", "selected");	// 지정된 index 값으로 select 하기
						break;
					case 3:	//1000의 자리
						$("#product_option_id5 option:eq("+n_num+")").attr("selected", "selected");	// 지정된 index 값으로 select 하기
						break;
					case 4:	//10000의 자리
						$("#product_option_id6 option:eq("+n_num+")").attr("selected", "selected");	// 지정된 index 값으로 select 하기
						break;
					case 5:	//100000의 자리
						$("#product_option_id7 option:eq("+n_num+")").attr("selected", "selected");	// 지정된 index 값으로 select 하기
						break;
					case 6:	//1000000의 자리
						$("#product_option_id8 option:eq("+n_num+")").attr("selected", "selected");	// 지정된 index 값으로 select 하기
						break;
					case 7:	//10000000의 자리
						$("#product_option_id9 option:eq("+n_num+")").attr("selected", "selected");	// 지정된 index 값으로 select 하기
						break;
				}
			}
		}
		
		// 구스킨을 사용할경우 총 금액 계산
		setOldTotalPrice();
	}

	//사용안함 - 참고용으로 나겨둠
	function myInit()
	{
		var isCaculate = false;
		
		//th text에 0원단위가 있으면 면접계산을 진행하는걸로 판단했습니다.(10원단위, 100원단위, 1000원단위,...)
		//이부분에 제품규격이 있는지를 판단하고 진행하는게 더 좋을거 같습니다.
		optionTable.find('th').each(function(){
			if($(this).text().indexOf('0원단위')===0){
				isCaculate=true;
				return false;
			}
		});


		//면적계산식 UI 구성
		if (isCaculate) {
		 
			var useroption=false;
			
			optionTable.find('tr.xans-product-addoption').each(function(){
				if($(this).find('th').text()==='제품규격'){
					useroption=true;
					return false;
				}
			});

			
			//현재 옵션사항중 보이지 않아야 될부분을 숨기는 소스
			var hidecss = { "position":"absolute","left":"0","top":"-9999px","width":"0","height":"0",'overflow':'hidden'};
			
			if(!useroption){
				hidecss={'display':'none'};
			}
			
			
			optionTable.find('tr.xans-product-addoption').css(hidecss);
			optionTable.find('tr.xans-product-option').each( function() {            
				if ( $(this).find('th').text().indexOf('0원단위')==0) {
				   $(this).css(hidecss);
				}
			});
		}
	}

    //입력범위 체크 및 필수옵션 선택확인
    function input_size_keyup(input) {
         
		//입력값 체크             
		$('input[name=w_cm]').attr('value', $('input[name=w_cm]').attr('value').replace(/[^0-9]*/gi,''));
		$('input[name=h_cm]').attr('value', $('input[name=h_cm]').attr('value').replace(/[^0-9]*/gi,''));
		
		//입력범위체크
		if ($('input[name=w_cm]').val() > 9999 || $('input[name=h_cm]').val() > 9999 ) {
			alert('1~9999 사이 숫자만 입력 가능합니다');
			$(input).val('');
			$(input).focus();
		}                
			
		//필수옵션 선택확인            
		optionTable.find('.xans-product-option').each( function(index) {            
			if ( $(this).find('td > select').attr('required')==true) {                                          
				if ($(this).find('td > select option:selected').text()=='옵션선택') {
					 alert('필수옵션을 선택해주세요.');     
					 $('input[name=w_cm]').val('');
					 $('input[name=h_cm]').val('');                     
					 return false;
				 } 
			}
		}); 
		
		CalculateArea();
    }


    /* 면적계산 처리 */
    function CalculateArea()
	{
        var squareMeter = 0;            //면적   
        
        //면적에 따른 면적추가옵션가격 계산
        var squareMeter = ($('input[name=w_cm]').attr("value") * $('input[name=h_cm]').attr("value") / 10000).toFixed(3);                              
        
        //결과값 최소금액이 1 미만이면 무조건 1로 계산함
        if (squareMeter < 1)   squareMeter = 1;           
        
        //결과값 화면표시
        $('input[name=r_meter]').attr("value", squareMeter);   
		
		
        $('#add_option_0').val($('input[name=w_cm]').val() + '㎝ X ' + $('input[name=h_cm]').val() + '㎝');	//가로cm * 세로cm
		
        
		//추가옵션의 가격 셋팅
		setMyOptionVal();
    }
    