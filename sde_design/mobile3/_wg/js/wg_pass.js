/*********************************************************************************

    라이센스 : 엄우식(디자인웹굿)  jquery.DB_ratio.js

*********************************************************************************/

!(function($){
	$.fn.DB_ratio=function(options){
		var opt={
			type:2   //1(폭을 동일하게, %), 2(여백을 동일하게, px)
		};
		$.extend(opt,options);
		return this.each(function(){
			var $this=$(this);
			var $li=$this.find('.li');
			var len=$li.length;
			var type=opt.type;
			var $win=$(window);

			//css에 들어간 width값을 제거한다
			$li.css('width','auto');
			
			//폭을 동일하게(%)
			if(type==1){
				$li.css('width',100/len+'%');
			}

			//여백을 동일하게(px)
			var widthArr=[];
			var total=0;
			var width=0;
			var wrap=0;
			if(type==2){
				function reSize(){
					total=0;
					wrap=$this.outerWidth();
					for(var i=0;i<len;i++){
						widthArr[i]=$li.eq(i).width();	
						total+=widthArr[i];
					}
					width=(wrap-total)/len-0.1;    // -0.1 마지막메뉴 떨어짐 방지
					for(var i=0;i<len;i++){
						$li.eq(i).css('width',widthArr[i]+width);
					}
				}
				reSize();
				$win.resize(function(){
					reSize();
				});
				
			}
		});
	};			
})(jQuery);

$('.d_ratio').DB_ratio({});