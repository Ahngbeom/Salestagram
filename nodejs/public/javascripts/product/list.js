function createBootstrapListGroup(list) {

	let li = "";

	list.forEach(product => {
		li += "<li class=\"list-group-item list-group-item-action\" data-product-id='" + product.id + "'>" +
			"<div class='d-flex justify-content-between align-items-start'>" +
			"<div class=\"ms-2 me-auto\">" +
			"<p class=\"fw-light fst-italic\">" + product.id + "</p>" +
			"<input type=\"text\" class=\"form-control-plaintext fw-bold\" name=\"name\" value=\"" + product.name + "\" readonly />" +
			"<input type=\"text\" class=\"form-control-plaintext\" name=\"details\" value=\"" + (product.details !== '' ? product.details : '내용 없음') + "\" readonly />" +
			"</div>" +
			"<span class=\"badge bg-primary rounded-pill\">" + product.views + "</span>" +
			"</div>" +
			"<div class=\"d-grid gap-2 d-md-flex justify-content-md-end\">" +
			"<button type='button' class='btn btn-link link-warning productModifyBtn' data-product-id='" + product.id + "'>수정</button>" +
			"<button type='button' class='btn btn-link link-danger productRemoveBtn' data-product-id='" + product.id + "'>삭제</button>" +
			"</div>" +
			"</li>";
	})

	return li;
}

function getProductList() {
	$.ajax({
		type: "get",
		url: "/product/list",
		// async: false,
		dataType: "JSON",
		success: function (list) {
			if (list.length > 0) {
				list.sort(function (a, b) {
					return a.id - b.id;
				});
				$("#product-list-area").html(createBootstrapListGroup(list));
			} else {
				$("#product-list-area").addClass("text-center");
				$("#product-list-area").html("상품 없음");
			}
		}
	});
	return;
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
		success: function () {
			getProductList();
		}
	});
});


