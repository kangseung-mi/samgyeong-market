$(document).ready(function(){
    // ajax로 내용을 불러와 팝업을 띄울 때
    function tl_bpopup(je, options) {
        var $this = $(je);
        var url = $this.attr('data-ajax');
        var cp_options = Object.assign({}, options);
        var $popup = null;
        // 팝업시 on class 추가 
        if (typeof options['onOpen'] == 'function') {
        	cp_options.onOpen = function() {
            	$this.addClass('on');
                options.onOpen();
            }
        }
        if (typeof options['onClose'] == 'function') {
        	cp_options.onOpen = function() {
            	$this.removeClass('on');
                options.onOpen();
            }
        }
        if(!$this.hasClass('loaded') && url) {
            $popup = $newAt.ajax({
                url: url,
                type : 'post',
                dataType : 'html',
                success: function(data) {
                    var html = $newAt("<div class='remove'/>").html(data).find('#loadhtml').html();
                    $this.html(html);
                    $this.addClass('loaded');
                    $this.bPopup(cp_options);
                }
            });
    	} else {
            $popup = $this.bPopup(cp_options);
        }
    }

    $newAt('#btn-bpopup-simple').click(function(e) {
        tl_bpopup('#simple-box', {
            onOpen:function() {$('#btn-bpopup-simple').addClass('on');},
            onClose: function() {$('#btn-bpopup-simple').removeClass('on');}
        });
    });


    $newAt('#btn-bpopup-ajax').click(function(e) {
        tl_bpopup('#ajax-box', {
            onOpen:function() {$('#btn-bpopup-ajax').addClass('on');},
            onClose: function() {$('#btn-bpopup-ajax').removeClass('on');},
            autoClose: 5000 //5초후 닫힘
        });
    });

	$newAt('#btn-bpopup-transition').click(function(e) {
       tl_bpopup('#simple-box', { 
           onOpen:function() {$('#btn-bpopup-transition').addClass('on');},
           onClose: function() {$('#btn-bpopup-transition').removeClass('on');},
           easing: 'easeOutBack', //uses jQuery easing plugin
           speed: 450,
           transition:'slideUp',
       	   modalClose: false,
           opacity: 0
       });
    });
    
    var slider_on = false; //로딩후 스크립트 실행
    $newAt('#btn-bpopup-ajax-slide').click(function(e) {
        tl_bpopup('#ajax-box-slide', {
            onOpen:function() {
            	if(!slider_on) $newAt('.bpopup-slider').bxSlider({auto: true});
                slider_on = true;
                $('#btn-bpopup-ajax-slide').addClass('on');
            },
            onClose: function() {$('#btn-bpopup-ajax-slide').removeClass('on');},
            opacity: 0.5
        });
    });
    
    
    $newAt('#btn-bpopup-fixed').click(function(e) {
        tl_bpopup('#fixed-ajax-box', {
            positionStyle: 'fixed',
            appending: true,
            onOpen:function() {$('#btn-bpopup-fixed').addClass('on'); $('#fixed-ajax-box').addClass('on')},
            onClose: function() {$('#btn-bpopup-fixed').removeClass('on'); $('#fixed-ajax-box').removeClass('on')},
        });
    });


});
