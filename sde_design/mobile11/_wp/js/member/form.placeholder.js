$(document).ready(function(){
	var $ = jQuery11;
	// input placeholder
	var placeholder = function(){
		$('input[type=text], input[type=password]').each(function(){
			var label = $('label[for="'+$(this).attr('id')+'"]');
			if (label.length > 0){
				$(this).on('focus',function(){
					label.hide();
				});

				$(this).on('blur',function(){
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
});