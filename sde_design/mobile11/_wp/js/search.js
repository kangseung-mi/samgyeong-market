// search
jQuery11(function(){
    var loadKeyword = '';
	$('.header .bt.search a').bind('click', function(e){
		e.preventDefault();
        if (loadKeyword.length == 0){
        	loadKeyword = jQuery11('#keyword').val();
        }
        
		$('.header .searchBox').slideToggle(250);
		$('#topArea').toggleClass('search--active');
	});

	$('#search_cancel').bind('click', function(){
		$('#topArea').toggleClass('search--active');
	});
    
    jQuery11('#keyword').attr('onmousedown','');
    
    jQuery11(document).on('click', '#keyword', function(){
    	if ($(this).val() == loadKeyword){
        	$(this).val('');
        }
    });
});