$(document).ready(function(){
    
    var reviewer = ($.CAFE24_SDK_REVIEWER_UP) ? $.CAFE24_SDK_REVIEWER_UP.skin.shift() : false;
    //console.log($.CAFE24_SDK_REVIEWER_UP, reviewer, 2);
    var rowData = {};
    var modeSet = ["img", "text", "all"];
    
    var gpage = 1;
    var gpno;
    var glimit;
    var gtype;
    var guse_point;
    var config;
    var gdetail;
    var lastPage;
    var sort;
    
    var cellSize = $.CAFE24_SDK_REVIEWER_UP.cell_size;
    cellSize = parseInt(cellSize);
    cellSize = (isNaN(cellSize) || cellSize <= 0) ? 195 : cellSize;
    
    var isHigh = true;

    var readyFlag = true;
    var moreBtn = $('.xans-photoreview-display .more');
    
    var detailImgs = {};
    
    init();
    
    function init()
    {

        if (typeof $(".lister_wrap").lister !== "function") {
            return;
        }
        
        if (reviewer && reviewer.data.length > 0) {
            
            gpno = reviewer.pno;
            glimit = reviewer.cnt;
            gtype = reviewer.type;
            gdetail = reviewer.detail;
            guse_point = reviewer.config.use_point;
            config = reviewer.config;
            sort = reviewer.sort;
            lastPage = reviewer.total_page;
            
            if (lastPage > 1) {
                moreBtn.show();
            }
            
            initData();
            setEvt();
        } else {
            var row = {no:'#', rsub:'리뷰가 없습니다.', rwriter:'', rdate:'', rhit:'', rimg:'', rhimg: ''};
            var tmpl = makeCell(row);
            $(".xans-photoreview-display .lister_wrap").html(tmpl);
            $(".xans-photoreview-display .is_rating").hide();
        }
        
        $(".xans-photoreview-display .lister_wrap").show();
        $(".lister_wrap").lister({l_type:'pinterest', c_wid:cellSize});
        $('.xans-photoreview-display .lister_wrap .jq_lister_cell img[src=""]').hide();
        
        isHigh = isHighImg();
    }
    
    function initData()
    {
        hideElem();
        if (reviewer.data && reviewer.data.length > 0) {
            for (var i=0; i<reviewer.data.length; i++) {
                var row = reviewer.data[i];
                row.index = i;
                
                if (typeof row.rcont == 'string') {
                    row.rcont = row.rcont.replace(/<p[^>]*>/g,'').replace(/<\/p>/g,'<br/>');
                }
                rowData[row.no] = row; 
            }
        }
    }
    
    function setEvt()
    {
        $(document).delegate(".jq_lister_cell dt a", 'click', function(e){
            e.preventDefault();
            var no = $(this).attr("rel");
            showDetail(no);
        });
        
        $('.xans-photoreview-display .more a').click(function(e){
            e.preventDefault();
            
            if (gpage >= lastPage) {
                moreBtn.hide();
                return false;
            }
            
            if (readyFlag == true) {
                readyFlag = false;
                moreBtn.hide();
                $.CAFE24_SDK_REVIEWER_UP.call_more({act:'getMore',pno:gpno, next:gpage+1, cnt:glimit, mode:gtype, point:guse_point, config: config, sort:sort}, page_refresh);
            }
            
        });
        
        $(".xans-photoreview-display .detail .close").click(function(e){
            e.preventDefault();
            hideDetail();
        });
        
//        $(".xans-photoreview-display .detail-dimmed").click(function(e){
//            e.preventDefault();
//            hideDetail();
//        });
        
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { 
                hideDetail();  // esc
            }
        });
    }
    
    function page_refresh(list)
    {
        reviewer = list;
        initData();
        
        var cells = [];
        var data = list.data;
        if (data && data.length > 0) {
            for(var i=0; i<data.length; i++) {
                var cell = makeCell(data[i]);
                if (cell) {
                    cells.push(cell);
                }
            }
            
            if (cells.length > 0) {
                $(".lister_wrap").lister.addCell(cells);
            }
            hideElem();
        }
        
        gpage = reviewer.page;
        
        if (gpage >= lastPage) {
            moreBtn.hide();
        } else {
            moreBtn.show();
        }
        readyFlag = true;
    }
    
    function makeCell(c)
    {
        var tmpl = [];
        var img = (isHigh == true) ? c.rhimg : c.rimg;
        tmpl.push('<dl>');
        tmpl.push('<dt><a href="#none" rel="'+c.no+'"><img src="'+img+'" alt="" /></a></dt>');
        tmpl.push('<dd>');
        tmpl.push('<p>'+c.rsub+'</p>');
        tmpl.push('<p class="date">'+c.rdate+'</p>');
        tmpl.push('<p class="point is_rating"><img src="//img.echosting.cafe24.com/apps/photo-review/skin3/ico_star'+c.rpoint+'.png" alt="'+c.rpoint+'점" /></p>');
        tmpl.push('<p class="post">'+c.rwriter+'</p>');
        tmpl.push('</dd>');
        tmpl.push('</dl>');
        return tmpl.join('');
    }
    
    function isHighImg()
    {
        var sample = $(".jq_lister_cell dt a img");
        var thumb = 0;
        if (sample.length > 0) {
            for (var i=0; i<sample.length; i++) {
                var img = $(sample[i]).attr("src");
                if (img.search("/gallery/") !== -1) {
                    thumb++;
                }
            }
        }
        if (thumb > 1) {
            return false;
        }
        return true;
    }
    
    function setBodyScroll(scroll)
    {
        if ( scroll == true ) {
            $("body").css("overflow","scroll");
        } else {
            $("body").css("overflow","hidden");
        }
    }
    
    function showDetail(no)
    {
        if (rowData[no]) {
            var row = rowData[no];
            if (row) {
                var imgs = makeImgTags(row);
                $(".detail-dimmed .detail .post span").html(row.rwriter);
                $(".detail-dimmed .detail .image").html('');
                if (imgs.length > 0) {
                    var img_html = '';
                    for (var i=0; i<imgs.length; i++) {
                        img_html += '<a href="'+imgs[i]+'" rel="group" class="product-review-image"><img src="'+imgs[i]+'" /></a>';
                    }
                    $(".detail-dimmed .detail .image").html(img_html);
                }
                $(".detail-dimmed .detail .contents").html(row.rcont);
                $(".detail-dimmed .detail .title").html(row.rsub);
                
                $(".detail-dimmed").bPopup({zIndex:5000});
                
                /*
                $(".xans-photoreview-display .detail").fadeIn('fast');
                setBodyScroll(false);
                */
                
                $newAt(".product-review-image").fancybox({cyclic:true});
                
                //조회수
                //$.ajax({type:"GET",url:"/apps/photoreview/photodetail.xml?no="+row.rno,success:function(data){}});
            }
        }
        
    }
    
    function makeImgTags(row)
    {
        if (detailImgs[row.rno]) {
            return detailImgs[row.rno];
        }
        
        var imgs = [];
        if (row.rhimg && (/^.*\.(jpg|jpeg|png|gif|bmp)$/i).test(row.rhimg)) {
            imgs.push(row.rhimg);
        }
        
        if (row.attach && row.attach.length > 0) {
            for (var i=0; i<row.attach.length; i++) {
                var att_img = row.attach[i];
                if (typeof att_img.att_path == "string" && (/^.*\.(jpg|jpeg|png|gif|bmp)$/i).test(att_img.att_path)) {
                    imgs.push(att_img.att_path);
                }
            }
        }
        detailImgs[row.rno] = imgs;
        return detailImgs[row.rno];
    }
    
    function hideDetail()
    {
        $(".xans-photoreview-display .detail-dimmed").hide();
        $(".xans-photoreview-display .detail").hide();
        setBodyScroll(true);
    }
    
    function hideElem()
    {
        if (gdetail == true) {
            $(".xans-photoreview-display .is_detail").remove();
        }
        
        if (guse_point !== true) {
            $(".xans-photoreview-display .is_rating").remove();
        }
    }
    
    //  fancybox
    $newAt('.prdReview_bg .review_pop_width').fancybox({type:'iframe', width:'926px', height:'660px', autoSize:false, opacity:true, padding:10, margin:20});  
});