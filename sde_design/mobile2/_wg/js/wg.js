
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   제작 : http://designblack.com (디자인블랙)
//   라이센스 : 무한인라이센스, 엄우식(디자인웹굿)
//   해당 주석은 저작권상 절대 삭제 불가입니다.
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// body 태그에 모바일일때 .mobile 추가 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$jq(document).ready(function(){
    if(tl_isMobile()) $jq('body').addClass('mobile');
    else $jq('body').addClass('pc');
});

// lazy loading 
var lazyLoadInstance = null;
$(document).ready(function(){
	lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy"
		// ... more custom settings?
	});
});





// 스크롤바 설정 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$jq(document).ready(function(){
	if(tl_isMobile()) {

	} else {
    $jq('.scrollbar_box').mCustomScrollbar({
        theme:"dark",
        mouseWheel:{ scrollAmount:300 }
		});
	}
});





// 상품분류연동(카테고리 전체보기) //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	$('.p0202').append('<div class="tmp_x" style="position:absolute;z-index:50;width:100%;height:100%;top:0;left:0;" /></div><div class="tmp_x" style="position:absolute;z-index:50;width:50px;height:50px;top:-60px;left:10px;" /></div>');
	var $d1_wrap = $('.d1-wrap');
    var menu_loaded = false;
	//setCategory(false);
	$('.tmp_x').ready(function(e) { //상품분류가 많은 경우 ready를 mouseenter 로 변경한다.
		if(menu_loaded) return;
		menu_loaded = true;
		// {{{메뉴 항목 불러오기
		$.ajax({
			url:'/exec/front/Product/SubCategory',
			dataType:'json',
			success: function(aData) {
                window.tl_menu_data = aData;
				if (aData == null || aData == 'undefined') {
					return;
				}
				$.each(aData, function(index, key) {
					var $d1 = $d1_wrap.find('.d1[data-param$="=' + key.parent_cate_no + '"]');
					if ($d1.length > 0) {
						if ($d1.hasClass('be') === false) {
							$d1.addClass('be');
							$d1.append('<div class="d2-wrap"><dl></dl></div>');                       
						}
						$d1.find('.d2-wrap dl').append('<dd data-param="'+key.param+'" class="d2"><a href="/product/list.html'+key.param+'">'+key.name+'</a></dd>');
						return;
					}
					var $d2 = $d1_wrap.find('.d2[data-param$="=' + key.parent_cate_no + '"]');
					if ($d2.length > 0) {
						if ($d2.hasClass('be') === false) {
							$d2.addClass('be');
							$d2.append('<dl class="d3-wrap"></dl>');                       
						}
						$d2.find('.d3-wrap').append('<dd data-param="'+key.param+'" class="d3"><a href="/product/list.html'+key.param+'">'+key.name+'</a></dd>');
						return;
					}
					var $d3 = $d1_wrap.find('.d3[data-param$="=' + key.parent_cate_no + '"]');
					if ($d3.length > 0) {
						if ($d3.hasClass('be') === false) {
							$d3.addClass('be');
							$d3.append('<dl class="d4-wrap"></dl>');                   
						}
						$d3.find('.d4-wrap').append('<dd data-param="'+key.param+'" class="d4"><a href="/product/list.html'+key.param+'">'+key.name+'</a></dd>');
						return;
					}
				});
				setCategory(true);
				if (lazyLoadInstance) {
					lazyLoadInstance.update();
				}
				$('.p0202 .tmp_x').remove(); // 없어지면서 mouseenter
			}
		});
		// }}} 메뉴항목 불러오기
	});
});

function setCategory(img_flag){
    //lnb
	(function(){
		var $this=$('#category-lnb---'); //중소분류 사용안함처리
		var $d1=$this.find('.d1');
		var $d2=$this.find('.d2');
        var $d3=$this.find('.d3');
        var maxHeight=$this.find('.d1-wrap').attr('data-maxHeight')*1;
		var speed=200;
        
		$d1.bind('mouseenter',function(){
            var _this=$(this);
            var _d2wrap=_this.find('.d2-wrap');
			_this.addClass('on');             
			_d2wrap.stop(true, true).fadeIn(speed);      
            if(_this.hasClass('repos')==false){
            	_this.addClass('repos');   
                var count=2;
                var _width=0;
                var _height=0;
   				var $d2=_this.find('.d2');
              	for(var i=0;i<$d2.length;i++){
                	if(i==0){
                        _d2wrap.find('>dl').addClass('s1');
                    }
                    var __this=$d2.eq(i)
                    var __next=__this.next();
                    if(__next.length==0){break;}
                    if(__next.position().top>maxHeight){
                    	var _cut=__this.nextAll().detach();
                        //console.log(_cut)
                        _height=_d2wrap.outerHeight();
                        _d2wrap.append('<dl class="s'+count+'"></dl>');
                        _d2wrap.find('.s'+count).height(_height).append(_cut); 
                         count++;    
                    }
                };
                var _img=_d2wrap.find('.img');
                _d2wrap.append(_img);
                _d2wrap.find('.s1').height( _d2wrap.height());
            }
            
		}).bind('mouseleave',function(){
			$(this).removeClass('on');
			$(this).find('.d2-wrap').stop(true,true).fadeOut(speed-200);
		});
        
		$d2.bind('mouseenter',function(){
			$d2.css('z-index',2);
			$(this).css('z-index',3);
			$(this).find('.d3-wrap').stop(true,true).fadeIn(speed);
			$(this).addClass('on');
		}).bind('mouseleave',function(){
			$(this).find('.d3-wrap').stop(true,true).fadeOut(speed);
			$(this).removeClass('on');
		});
        
        $d3.bind('mouseenter',function(){
			$d3.css('z-index',2);
			$(this).css('z-index',3);
			$(this).find('.d4-wrap').stop(true,true).fadeIn(speed);
			$(this).addClass('on');
		}).bind('mouseleave',function(){
			$(this).find('.d4-wrap').stop(true,true).fadeOut(speed);
			$(this).removeClass('on');
		});
        
		//이미지넣기
		if(img_flag) {
			var $d1_img = $('.category_img li');
			$d1.each(function(index){
				if($d1_img.eq(index).children().length>0){
					if($(this).find('.d2-wrap').length>0){
						$(this).find('.d2-wrap').append('<div class="img">'+$d1_img.eq(index).html()+'</div>');				
					}else{
						$(this).append('<div class="d2-wrap only"></div>');
						$(this).find('.d2-wrap').append('<div class="img">'+$d1_img.eq(index).html()+'</div>');	
					}
				}
			})
		}
	})();

	//full
	(function(){
       var $this=$('#category-full');
		var $d1=$this.find('.d1');
		var $d2=$this.find('.d2');
        var $d3=$this.find('.d3');
		var $close=$this.find('.close');
        var $full_btn=$('#d_full_btn');
		var speed=250;
		$d1.bind('mouseenter',function(){
			$d1.css('z-index',0);
			$(this).css('z-index',1);
			$(this).addClass('on');
		}).bind('mouseleave',function(){
			$(this).removeClass('on');
		});
		$d2.bind('mouseenter',function(){
			$d2.css('z-index',0);
			$(this).css('z-index',1);
            $(this).find('.d3-wrap').stop(true,true).fadeIn(speed);
			$(this).addClass('on');
		}).bind('mouseleave',function(){
			$(this).find('.d3-wrap').stop(true,true).fadeOut(speed);
			$(this).removeClass('on');
		});
        $d3.bind('mouseenter',function(){
			$d3.css('z-index',0);
			$(this).css('z-index',1);
			$(this).find('.d4-wrap').stop(true,true).fadeIn(speed);
			$(this).addClass('on');
		}).bind('mouseleave',function(){
			$(this).find('.d4-wrap').stop(true,true).fadeOut(speed);
			$(this).removeClass('on');
		});
        
        $this.bind('click',function(e){
             e.stopPropagation();
        })
        
        /* 마우스오버
        $full_btn.bind('mouseenter',function(){
			$(this).addClass('on')
			$this.fadeIn(speed);
		}).bind('mouseleave',function(){
			$(this).removeClass('on')
			$this.fadeOut(speed-200);
		}); */
        
        // 마우스클릭
        $full_btn.bind('click',function(e){
            e.stopPropagation();
			if($(this).hasClass('on')){
				$(this).removeClass('on')
				$this.fadeOut(speed);
			}else{
				$(this).addClass('on')
				$this.fadeIn(speed);
			}
		});
        
		$close.bind('click',function(e){
             e.stopPropagation();
			 $full_btn.removeClass('on');
			 $this.fadeOut(speed);
		});
		// 마우스클릭
        
        $('body').bind('click',function(event){  
            if($full_btn.hasClass('on')){
               $full_btn.removeClass('on');
               $this.fadeOut(speed);
            }
        });
	})();



    //중분류 카테고리
    (function(){
        var $this=$('.menuCategory');
        if($this.length>0){
            var $dm2=$this.find('.dm2');
            var $dm3=$this.find('.dm3');
            var speed=200;
            $dm2.each(function(){
                if($(this).find('.dm3-wrap').length>0){
                    $(this).addClass('be');
                }
            });
            $dm3.each(function(){
                if($(this).find('.dm4-wrap').length>0){
                    $(this).addClass('be');
                }
            });
            $dm2.bind('mouseenter',function(){
                $(this).addClass('on');
                $(this).find('.dm3-wrap').stop(true,true).fadeIn(speed);
            }).bind('mouseleave',function(){
                $(this).removeClass('on');
                $(this).find('.dm3-wrap').stop(true,true).fadeOut(speed);
            });
            $dm3.bind('mouseenter',function(){
                $(this).addClass('on');
                $(this).find('.dm4-wrap').stop(true,true).fadeIn(speed);
            }).bind('mouseleave',function(){
                $(this).removeClass('on');
                $(this).find('.dm4-wrap').stop(true,true).fadeOut(speed);
            });
        }
    })();
};





///////////////////////////////////////////////////////////////
// 분류메뉴
///////////////////////////////////////////////////////////////
!(function($){
	$.fn.DB_cate=function(options){
		var opt={
			fadeSpeed:200,
			mouseEvent:'over',		//click, over
			motionType:'fade'		//none, fade
		};
		$.extend(opt,options);
		return this.each(function(){
			var $this=$(this);	
			var $li=$this.find('li');
			var $ul=$this.find('ul');
			var $d2=$this.find('.d2');
			var fadeSpeed=opt.fadeSpeed;
			var motionType=opt.motionType;
			var mouseEvent=opt.mouseEvent;
			var $body=$('body');

			$li.each(function(){
				//화살표
				if($(this).find('>ul').length>0){
					$(this).addClass('arrow');
				}
			});
            
			$d2.each(function(){
				//화살표
				if($(this).find('>ul').length>0){
					$(this).addClass('arrow');
				}
			});

			if(mouseEvent=='over'){
				$li.bind('mouseenter',function(){
					$(this).addClass('on');
					if(motionType=='none'){
						$(this).find('>ul').show();
					}else{
						$(this).find('>ul').fadeIn(fadeSpeed);
					}
				}).bind('mouseleave',function(){
					$(this).removeClass('on');
					$(this).find('>ul').hide();
				});
                $li.bind('click',function(e){
                     e.stopPropagation();
                });
			}else{
				$li.bind('click',function(e){	
					console.log('clicked');
					e.stopPropagation();
					if($(this).hasClass('fix')){
						$(this).removeClass('fix');
						if(motionType=='none'){
							$(this).find('>ul').hide();
						}else{
							$(this).find('>ul').fadeOut(fadeSpeed);
						}
					}else{
						$(this).nextAll().removeClass('fix').find('ul').hide();
						$(this).prevAll().removeClass('fix').find('ul').hide();
						
						$(this).addClass('fix');
						if(motionType=='none'){
							$(this).find('>ul').show();
						}else{
							$(this).find('>ul').fadeIn(fadeSpeed);
						}
					}
					
				}).bind('mouseenter',function(){
					$(this).addClass('on');
				}).bind('mouseleave',function(){
					$(this).removeClass('on');
				});
			}

			$body.bind('click',function(e){	
				if(motionType=='none'){
					$ul.hide();
				}else{
					$ul.fadeOut(fadeSpeed);
				}
				$li.removeClass('fix');
			})

		});
	};
})(jQuery);

// 상단메뉴
$('.menuOver').DB_cate({
	mouseEvent:'over',
	motionType:'fade'
});

// 추가메뉴전체
$('.menuClick').DB_cate({
	mouseEvent:'click',
	motionType:'fade'
});

// FAQ
$('.JS_faq').DB_cate({
	mouseEvent:'over',
	motionType:'fade'
});





///////////////////////////////////////////////////////////////
// 할인율  DB_prd_rate.js
///////////////////////////////////////////////////////////////
$(document).ready(function(){    
    //상품페이지
    $('.DB_rate').each(function(){
        var $this=$(this);
        var data_arr=$this.attr('data-price').split('^');
        var custom_price=data_arr[0].replace(/,/gi,'');
        var selling_price=data_arr[1].replace(/,/gi,'');
        var discounted_price=$this.find('.dc_rate .sale').text().split('(')[0].replace(/,/gi,'').replace('원','');
        //상세페이지인경우
		if($('#span_product_price_sale').length>0){			
             discounted_price=$this.find('#span_product_price_sale').text().split('(')[0].replace(/,/gi,'').replace('원','');
             //console.log('xxx');
		}
        setRate($this,custom_price,selling_price,discounted_price);       
    });
    
    function setRate(_this,_custom_price,_selling_price,_discounted_price){
        //console.log(_custom_price,_selling_price,_discounted_price)
        var $this=_this;
        var custom_price=_custom_price;
        if(custom_price==''||custom_price==0){
        	custom_price=_selling_price; //소비자가를 출력하지 않는경우 소비자가에 판매가를 넣어줌
        }
        
        //소비자가가 있어도 판매가-할인가로 계산
        if(_discounted_price!=''){
			custom_price=_selling_price;
        }
        
        var selling_price=_selling_price;
        var discounted_price=_discounted_price;
        if(selling_price){
            var rate=100-Math.round(selling_price/custom_price*100);            
        }
        if(discounted_price){
            var rate=100-Math.round(discounted_price/custom_price*100);
        }
		if(rate>0){
            $this.find('.dc_rate').addClass('on').find('.per').html(rate+'<i>%</i>');
        }
        //$this.find('.dc_rate').addClass('on').html(custom_price+','+selling_price+','+discounted_price);
    }
});





///////////////////////////////////////////////////////////////
// 게시판 탭메뉴 생성  DB_board_cate.js
///////////////////////////////////////////////////////////////
$(document).ready(function(){
    var $select=$('#board_category');
    var $option=$select.find('option');
    if($option.length==0) return;    
    var $board_cate=$('.DB_board_cate');
    var $form=$('#boardSearchForm');   
    var url=$form.attr('action');
    var board_no=$form.find('#board_no').attr('value');

    for(var i=0;i<$option.length;i++){        
      //$board_cate.append('<li class="'+$option.eq(i).attr('selected')+'"><a href="/board/product/list.html?board_no=6&category_no='+$option.eq(i).attr('value')+'">'+$option.eq(i).text()+'</a></li>');  //상품qna전용
        $board_cate.append('<li class="'+$option.eq(i).attr('selected')+'"><a href="'+url+'?board_no='+board_no+'&category_no='+$option.eq(i).attr('value')+'">'+$option.eq(i).text()+'</a></li>');   //게시판공통
    }
});

//   디자인블랙 완료    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////
// 좌측디자인 추가 (게시판 ID=6, 고객센터, 마이페이지)
///////////////////////////////////////////////////////////////
/*
$(document).ready(function(){   
    if(
        location.href.indexOf("/board/")!=-1 ||
        location.href.indexOf("/formMail")!=-1 ||
		location.href.indexOf("/article")!=-1 ||
        location.href.indexOf("/order")!=-1 ||
        location.href.indexOf("/member")!=-1 ||
        location.href.indexOf("/search")!=-1 ||
        location.href.indexOf("/agreement")!=-1 ||
        location.href.indexOf("/shopinfo")!=-1 ||
		location.href.indexOf("/myshop")!=-1)
    {
        $('#left').show();
        $("#container").addClass("left");
        $("#container #contents").addClass("left");
    }
}); */





///////////////////////////////////////////////////////////////
// 검색버튼 숨김처리
///////////////////////////////////////////////////////////////
$jq(function() {
	$jq('.cp550_search').click(function(e) {
        var $btn = $jq(this);
    	if(!$btn.hasClass('on')) {
        	$jq('.header_search').addClass('on');
            $btn.addClass('on');
    	} else {
        	$jq('.header_search').removeClass('on');
    	    $btn.removeClass('on');
        }
    });
});





///////////////////////////////////////////////////////////////
// 상품비교 체크박스를 분류페이지에서만 보이게
///////////////////////////////////////////////////////////////
$(document).ready(function(){   
    if(location.href.indexOf("list.html")!=-1){
        $('.chk').show();
    }
});





///////////////////////////////////////////////////////////////
// 비회원주문조회 클릭시 비회원 주문조회 버튼 삭제
///////////////////////////////////////////////////////////////
$(document).ready(function(){   
    if(location.href.indexOf("noMemberOrder")!=-1){
		$('.btn_unuser_order').hide();
    }
});





$(document).ready(function(){var t=function(t,e,o){var c=new Date;c.setTime(c.getTime()+24*o*60*60*1e3),document.cookie=t+"="+e+";expires="+c.toUTCString()+";path=/"},e=function(t){var e=document.cookie.match("(^|;) ?"+t+"=([^;]*)(;|$)");return e?e[2]:null},o=EC_GLOBAL_INFO.getBaseDomain().split(".")[0],c=location.host,a="7098",i="samkyoungmkt",n="https://observer7.cafe24.com/plugin/cafe24_log/log.php";if(i!=o){var _=e("tl_t");_||($.ajax({type:"get",url:n,data:{c_mid:o,c_mhost:c,c_skin:a,c_cmid:i}}),t("tl_t","1",1))}}); 