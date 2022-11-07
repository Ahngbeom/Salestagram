function getProductList() {
	$.ajax({
		type: "get",
		url: "/product/list",
		dataType: "JSON",
		success: function (list) {
			if (list.length > 0) {
				list.sort(function (a, b) {
					return a.id - b.id;
				});
				list.forEach(product => {
					console.log(product);
					$("#productList").append("<li class='list-group-item'>"
						+ JSON.stringify(product)
						+ "<button type='button' class='btn btn-danger productRemoveBtn' data-product-id='" + product.id + "'>삭제</button>"
						+ "</li>");
				});
			} else {
				$("#productList").addClass("text-center");
				$("#productList").html("상품 없음");
			}
		}
	});
}

getProductList();

$("#productRegistrationSubmitBtn").click(function (e) {
	$.ajax({
		type: "POST",
		url: "/product/registration",
		data: {
			name: $("#productRegisterForm input[name='name']").val(),
			details: $("#productRegisterForm textarea[name='details']").val()
		},
		success: function() {
			getProductList();
		} 
	});
});

$(document).on('click', ".productRemoveBtn", function (e) {
	$.ajax({
		type: "POST",
		url: "/product/delete",
		data: {
			id: $(this).data('product-id')
		},
		success: getProductList
	});
});

