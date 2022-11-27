$(document).on('click', ".productRemoveBtn", function () {
	$.ajax({
		type: "POST",
		url: "/api/product/remove",
		data: {
			id: $(this).data('product-id')
		},
		success: function (data) {
			console.log("Remove Product [" + data + "]");
			getProductList();
		},
		error: function (xhr) {
			console.log(xhr);
		}
	});
});
