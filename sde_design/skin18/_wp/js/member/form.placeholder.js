$(document).ready(function(){
	var $ = jQuery11;
	// input placeholder
	var placeholder = function(){
		$('input[type=text], input[type=password]').each(function(){
			var label = $('label[for="'+$(this).attr('id')+'"]');
            
			if (label.length > 0){
				$(document).on('focus', '#'+$(this).attr('id'), function(){
					label.hide();
				});
                
                $(document).on('blur', '#'+$(this).attr('id'), function(){
					if ($(this).val().length == 0){
						label.show();
					}
				});
			}

			if ($(this).val().length == 0){
				label.show();
			}
		});
	}
	placeholder();

	$('.member_type_wrap input[type=radio]').on('click', function(){
		placeholder();
	});
    
    // 휴대폰 인증 활성화 시 네임 부분 플레이스홀더 제거
    if($('#name').length <= 0) {
        $('#nameContents').closest('.bx').find('label').remove();
    }
});