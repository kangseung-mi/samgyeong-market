$(document).ready(function(){
	jQuery11('.relation-list .item').each(function(){
		var self = this;
		var $custom = $(this).find('.customPrice');
		var product_no = getQueryStringUrl(' ' + $(this).data('param'),'product_no');

		if (!product_no) return;

		jQuery11.get('/product/detail_prod_data.html?product_no='+product_no,function(res){
			var custom = $(res).find('#custom').data('custom');
			var price = $(res).find('#price').data('price');

			try{
				if (custom && custom > 0) {
					$custom.text($(res).find('#custom').text()).show();
					var rate = 0;
					if (!isNaN(custom) && !isNaN(price)) {
						rate = Math.round((custom - price) / custom * 100);
					}
					$(self).find('.rate').text(rate).css('display','inline-block');
				}

				var simple_desc = $(res).find('#simple').html();
				if (simple_desc.length > 0){
					$(self).find('.summary').html(simple_desc).show();

				}
			}catch(e){};
		});
	});
});
