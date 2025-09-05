;(function($){

    $.fn.lister = function ( opt ) {

        options = $.extend({}, $.fn.lister.defaults, opt );
        var $obj = $(this);
        $wrapper = $($obj[0]);
        var list_man;

        //action
        if ( options.l_type == 'pinterest' ) {
            list_man = pinterest();
        } else if ( options.l_type == 'tumblr' ) {
            list_man = tumblr();
        } else if ( options.l_type == 'instagram' ) {
            list_man = instagram();
        }

        if ( list_man ) {
            list_man.init();
            list_man.evtSet();
        }

        $.fn.lister.list_man = list_man;

        return $obj;
    };

    $.fn.lister.addCell = function(data) {
        $.fn.lister.list_man.addCell(data);
    };

    //var
    $.fn.lister.defaults = {
        l_type: 'pinterest'
    };

    var options;
    var $wrapper;
    var cells;
    var resizeTimer;
    var ie_resizeChecker;

    //pin
    function pinterest()
    {
        var pinterest = {c_wid:186, w_wid:0};

        //func
        pinterest.init = function () {
            this.setCss();
            this.valWidth();
            this.calWidth();
            this.getCell();
            this.genGuide();
            this.appendCell();
            this.evtSet();
        };

        pinterest.reGroup = function () {

            this.clean();
            this.responsiveWidth();
            this.calWidth();
            this.genGuide();
            this.appendCell();
        };

        pinterest.evtSet = function () {
            if( !$.browser.msie ) {
                $(window).resize(function(){
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() { pinterest.reGroup(); }, 100);
                });
            } else {
                setInterval(function(){
                    if (ie_resizeChecker && ie_resizeChecker != $wrapper.parent().width()) { 
                        pinterest.reGroup(); 
                        }
                    ie_resizeChecker = $wrapper.parent().width();
                }, 500);
            }
            //this.ieBoxShadow();
        };

        pinterest.ieBoxShadow = function() {
            if ( $.browser.msie ) {
                $(".jq_lister_cell").css({'border-bottom':'2px solid #c9c7c8', 'border-left':'1px solid #c9c7c8', 'border-top':'1px solid #dedcdd', 'border-right':'1px solid #c9c7c8'});
            }
        };

        pinterest.clean = function () {
            //cells = $(".jq_lister_cell");
            $(".jq_lister_guide_co").remove();
        };    

        pinterest.setCss = function () {
            if ( !options.c_wid ) {
                options.c_wid = this.c_wid;
            }

            if ( !options.c_hei ) {
                options.c_hei = this.c_hei;
            }

            if ( !options.w_wid ) {
                options.w_wid = $wrapper.width();
            }

            $wrapper.addClass('jq_lister_pinterest');
        };

        pinterest.valWidth = function () {

            if ( options.c_wid < this.c_wid ) {
                options.c_wid = this.c_wid;
            }

            if ( options.w_wid < this.w_wid ) {
                options.w_wid = this.w_wid;
            }
            $wrapper.css({width:'100%'});

        };

        pinterest.responsiveWidth = function () {

            options.w_wid = $wrapper.parent().width();

            if ( 300 >= options.w_wid ) {
                options.w_wid = 300;
            }

            $wrapper.css({width:options.w_wid});

        };

        pinterest.calWidth = function() {
            options.c_num = Math.floor(options.w_wid/options.c_wid);
            options.w_pad = Math.floor( (options.w_wid%options.c_wid)/2);
        };

        pinterest.getCell = function() {

            cells = $wrapper.children('dl');
        };

        /*pinterest.sortCell = function()
        {
            cells.sort(function(a,b){
                var anum = $(a).attr('sort');
                var bnum = $(b).attr('sort');
                if (anum == bnum) return 0;
                if (anum > bnum) return 1;
                if (anum < bnum) return -1;
            });
        };*/

        pinterest.genGuide = function() {

            $(".lister_clear").remove();

            for( var i = 0; i < options.c_num; i++ ) {
                var guide_id = 'jq_lister_guide'+ i;
                //var $guide = $("<div/>").css({'top':0,'left':(i*options.c_wid)+options.w_pad,'width':options.c_wid,'margin-left':options.c_pad,'position':'absolute'});
                

                var $guide;
                if (options.c_num == 1 && i == 0) {
                    $guide = $("<div/>").css({'vertical-align':'top', 'width': '100%'});
                } else {
                    $guide = $("<div/>").css({'vertical-align':'top', 'width':options.c_wid});
                }
                
                if( options.c_num > 1 && i == 0 ) {
                    $guide.css({'margin-left':options.w_pad});
                }

                $guide.attr('id', guide_id);
                $guide.addClass('jq_lister_guide_co');
                $wrapper.append($guide);
            }
            $wrapper.append('<div class="lister_clear" style="clear:both"></div>');
        };

        pinterest.appendCell = function() {

            if ( cells.length > 0 ) {
                for ( var i = 0; i < cells.length; i++ ) {
                    var inx =  i%options.c_num;
                    $(cells[i]).addClass('jq_lister_cell').appendTo('#jq_lister_guide'+ inx);
                    this.next = (i+1)%options.c_num;
                }
            }
            $wrapper.fadeIn(500);

            if (options.c_num == 1) {
                //$("#jq_lister_guide0 .jq_lister_cell").css({margin:"0"});
            }
        };

        pinterest.addCell = function(data) {

            var time = 0;
            if ( data && data.length > 0 ) {
                var beforeNext = this.next;
                for ( var i = 0; i < data.length; i++ ) {
                    var inx =  (i+beforeNext)%options.c_num;
                    var $o = $(data[i]).addClass('jq_lister_cell item_append').hide().appendTo('#jq_lister_guide'+ inx);
                    this.next = (i+beforeNext+1)%options.c_num;
                    cells.push($(data[i]));
                }
                //this.ieBoxShadow();
                $(".item_append").fadeIn('fast');
            }
        };

        return pinterest;
    }
    
    

})(jQuery);