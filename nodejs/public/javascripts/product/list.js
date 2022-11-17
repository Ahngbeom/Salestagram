getProductList();

function getProductList() {
	$.ajax({
		type: "get",
		url: "/product/list",
		async: false,
		dataType: "JSON",
		success: function (list) {
			if (list.length > 0) {
				$("#product-list-area").removeClass("text-center");
				$("#product-list-area").html(createBootstrapListGroup(list));
			} else {
				$("#product-list-area").addClass("text-center");
				$("#product-list-area").html("상품 없음");
			}
		}
	});
	return;
}

// $(document).on('click', "#product-list-area .list-group-item", (e) => {
// 	const productListElem = $(e.target).parents('li').length == 0 ? $(e.target) : $(e.target).parents('li');
// 	const id = $(productListElem.get()).data('product-id');
// 	console.log(id);

// 	$.ajax({
// 		type: 'GET',
// 		url: "/product/info",
// 		data: { id: id },
// 		success: function (data) {
// 			console.log(data);
// 		},
// 		error: function (xhr) {
// 			console.error(xhr);
// 		}
// 	})
// });

function createBootstrapListGroup(list) {

	let li = "";

	list.forEach(product => {
		const today = new Date();
		const regist_date = new Date(product.regist_date);
		const update_date = new Date(product.update_date);

		li += "<li class=\"list-group-item list-group-item-action p-3\" data-product-id='" + product.id + "'>" +
			"<div class='d-flex justify-content-between align-items-start'>" +
			"<p class=\"fw-light fst-italic\">" + product.id + "</p>" +
			"<span class=\"badge bg-primary rounded-pill\">" + product.views + "</span>" +
			"</div>" +
			"<div class=\"mb-2\">" +
			"<div class=\"row\">" +
			"<label class=\"col-4 col-form-label\">상품명: </label>" +
			"<div class=\"col-8\">" +
			"<input type=\"text\" class=\"form-control-plaintext fw-bold\" name=\"name\" value=\"" + product.name + "\" readonly />" +
			"</div>" +
			"</div>" +
			"<div class=\"row\">" +
			"<label class=\"col-4 col-form-label\">상품 설명: </label>" +
			"<div class=\"col-8\">" +
			"<input type=\"text\" class=\"form-control-plaintext\" name=\"details\" value=\"" + (product.details !== '' ? product.details : '내용 없음') + "\" readonly />" +
			"</div>" +
			"</div>" +
			"</div>" +
			"<div class=\"d-flex flex-column align-items-end mb-3\">" +
			"<p class=\"fw-light fst-italic m-0\">등록일자: " + regist_date.toLocaleString() + "</p>" +
			"<p class=\"fw-light fst-italic m-0\">" + dateTimeDiff(update_date, today) + "</p>" +
			"</div>" +
			"<div class=\"d-grid gap-2 d-flex justify-content-end\">" +
			"<button type='button' class='btn btn-link link-warning productModifyBtn' data-product-id='" + product.id + "'>수정</button>" +
			"<button type='button' class='btn btn-link link-danger productRemoveBtn' data-product-id='" + product.id + "'>삭제</button>" +
			"</div>" +
			"</li>";
	})

	return li;
}

function dateTimeDiff(startDate, endDate) {

	let dateTimeJSON = {
		year: Math.floor((endDate.getFullYear() - startDate.getFullYear())),
		month: Math.floor((endDate.getMonth() - startDate.getMonth())),
		day: Math.floor((endDate.getDay() - startDate.getDay())),
		hours: Math.floor((endDate.getHours() - startDate.getHours())),
		minute: Math.floor((endDate.getMinutes() - startDate.getMinutes())),
		seconds: Math.floor((endDate.getSeconds() - startDate.getSeconds()))
	}

	if (dateTimeJSON.year != 0) {
		return dateTimeJSON.year + "년 전 수정됨";
	}
	if (dateTimeJSON.month != 0) {
		return dateTimeJSON.month + "개월 전 수정됨";
	}
	if (dateTimeJSON.day != 0) {
		return dateTimeJSON.day + "일 전 수정됨";
	}
	if (dateTimeJSON.hours != 0) {
		return dateTimeJSON.hours + "시간 전 수정됨";
	}
	if (dateTimeJSON.minute != 0) {
		return dateTimeJSON.minute + "분 전 수정됨";
	}
	if (dateTimeJSON.seconds != 0) {
		return dateTimeJSON.seconds + "초 전 수정됨";
	}
}
