$(".product-like-btn").on('click', (e) => {
	const id = $($(e.target).parents('.card')).data('product-id');
	$.ajax({
		type: 'post',
		url: '/product/like/increase',
		data: {id: id},
		success: function(data) {
			$(".product-like-btn small").html(data);
		},
		error: function(xhr) {
			console.log(xhr.responseText);
		}
	});
});