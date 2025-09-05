jQuery(function() {
	(function($) {
        
        //console.log('########################################################');
        
        $('.review_open_menu').click(function() {
        	$(this).parent().parent().addClass('more');
        });
        
        
        $('.review_close_menu').click(function() {
        	$(this).parent().parent().removeClass('more');
        });
        
        
        $('.btn-vote-click').click(function() {
        	var no = $(this).attr('data-idx');
             $.ajax({
              url: "/exec/front/Board/vote/4?no=" + no + "&board_no=4&page=&return_url=/board/product/list.html",
              dataType: "html",
              success: function (a) {
                var e = a.split("alert('추천되었습니다.');");
                if (1 != e.length) {
                  alert("추천되었습니다");
                  fncGetCont(no)
                } else alert("이 게시물에는 더이상 추천하실 수 없습니다.")
              }
            })
        });
        

        function fncGetCont(no) {
          $.ajax({
            type: "POST",
            url: "/board/product/view_photo.html?no=" + no + "&board_no=4",
            dataType: "html",
            success: function (o) {
              var a = o.split('<span class="vote_no">');
              var n = a[1].split("</span>");
              $(".photo_list.xans-record-").each(function () {
                var o = $(this).find(".review_file").children("a").attr("href").split("&");
                var a = o[0].replace("/board/product/view_photo.html?no=", "");
                if (no == a) $(this).find(".vote_no").html(n[0]);
              })
            }
          })
        }
        
        $(".photo_list.xans-record-  .photo_file .review_pop_width").each(function () {
            // /exec/front/board/product/4?no=215&board_no=4&spread_flag=T&pass_check=F
            var href = $(this).attr('href');
            var x_url = '/exec/front/board/product/4?' + href.split('?')[1];
            console.log(x_url);
         	var $this = $(this);
            $.ajax({
            	type: "GET",
            	url: x_url,
            	dataType: "json",
            	success: function (data) {
                	if(data['read'] && data.read['content_image']) {
                        var images = data.read['content_image'].split('<br>');
                        var str = '';
                        for(var i=0; i<images.length; i++) {
                        	str += '<span class="image-box">'+images[i]+'</span>';
                        }
                    	$this.html(str);
                    }
                }
            });
        });
        
        $('.photo_used_box .point-info').each(function() {
        	var $this = $(this);
            var point = $this.attr('data-point');
            if(point == '5') $this.text("아주 맘에 들어요");
            else if(point == '4') $this.text("맘에 들어요");
            else if(point == '3') $this.text("보통이예요");
            else if(point == '2') $this.text("나쁘지 않아요");
            else if(point == '1') $this.text("별로예요");
            else $this.text("");
        });
        
        
        //  fancybox
        $('.photo_list .review_pop_width').fancybox({type:'iframe', width:'100%', height:'100%', padding:0, autoSize:false});
        
        
        /*
        $('.fancybox-skin').click(function() {
        	$.fancybox.close();
        });
        */
    })($newAt);
});