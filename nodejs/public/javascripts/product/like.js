$(".product-like-btn").on('click', (e) => {
	$.ajax({
		type: 'post',
		url: '/api/product/like/increase',
		data: {
			id: $(e.target).parents('.card').data('product-id')
		},
		success: function(data) {
			$(e.target).find('small').html(data.like);
		},
		error: function(xhr) {
			console.log(xhr.responseText);
		}
	});
});