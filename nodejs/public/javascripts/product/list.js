const productListAreaElem = $("#product-list-area");

getProductList();


function getProductList() {
	$.ajax({
		type: "get",
		url: "/api/product/list",
		async: false,
		dataType: "JSON",
		success: function (list) {
			if (list.length > 0) {
				productListAreaElem.removeClass("text-center");
				productListAreaElem.html(createBootstrapCard(list));
			} else {
				productListAreaElem.addClass("text-center");
				productListAreaElem.html("상품 없음");
			}
		}
	});
}

function createBootstrapCarousel(images) {

	if (images === null)
		return;

	let carousel = "<div id=\"carouselExampleIndicators\" class=\"carousel slide p-1\" data-bs-ride=\"false\">";

	let indicatorsBtns = "<div class=\"carousel-indicators\">";
	let carouselItem = "<div class=\"carousel-inner\">";
	images.forEach((image, index) => {
		if (index === 0) {
			indicatorsBtns += "<button type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide-to=\"" + index + "\" class=\"active\" aria-current=\"true\" aria-label=\"Slide " + (index + 1) + "\"></button>";
			carouselItem += "<div class=\"carousel-item active\">";
		} else {
			indicatorsBtns += "<button type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide-to=\"" + index + "\" aria-label=\"Slide " + (index + 1) + "\"></button>";
			carouselItem += "<div class=\"carousel-item\">";
		}

		carouselItem += "<img src=\"" + image.src + "\" class=\"img-fluid d-block w-100 pb-3\" alt=\"상품 이미지 없음\">" +
			"</div>";
	});
	indicatorsBtns += "</div>";
	carouselItem += "</div>";
	carousel += indicatorsBtns + carouselItem +
		"<button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide=\"prev\">" +
		"<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\">" + "</span>" +
		"<span class=\"visually-hidden\">Previous</span>" +
		"</button>" +
		"<button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide=\"next\">" +
		"<span class=\"carousel-control-next-icon\" aria-hidden=\"true\">" + "</span>" +
		"<span class=\"visually-hidden\">Next</span>" +
		"</button>" +
		"</div>";
	return carousel;
}

function createBootstrapCard(list) {

	let li = "";

	const today = new Date();
	list.forEach((product) => {
		const registry_date = new Date(product.regist_date);
		const update_date = new Date(product.update_date);

		li += "<div class=\"card w-100\" data-product-id='" + product.id + "'>" +
			createBootstrapCarousel(JSON.parse(product.images)) +
			"<div class=\"card-body\">" +
			"<h5 class=\"card-title\">" + product.name + "</h5>" +
			"<p class=\"card-text\">" + product.details + "</p>" +
			"<div class=\"d-flex flex-column align-items-end mb-3\">" +
			"<p class=\"fw-light fst-italic m-0\">등록일자: " + registry_date.toLocaleString() + "</p>" +
			(registry_date.getTime() === update_date.getTime() ? '' : "<p class=\"fw-light fst-italic m-0\">" + dateTimeDiff(update_date, today) + "</p>") +
			"</div>" +
			"</div>" +
			"<div class=\"card-footer d-flex justify-content-between align-items-center\">" +
			"<div class=\"d-flex gap-3 align-items-center\">" +
			
			"<button type='button' class='btn p-0 product-like-btn'>" +
			"<span><small>" + product.like + "</small></span>" +
			"❤" +
			"</button>" +
			
			"<button type='button' class='btn p-0'>" + 
			"<span><small></small></span>" +
			"⭐" + 
			"</button>" +

			"<button type='button' class='btn p-0'>" +
			"<span><small></small></span>" +
			"🛒" +
			"</button>" +

			"</div>" +
			"<div>" +
			"<button type='button' class='btn btn-link link-warning productModifyBtn' data-product-id='" + product.id + "'>수정</button>" +
			"<button type='button' class='btn btn-link link-danger productRemoveBtn' data-product-id='" + product.id + "'>삭제</button>" +
			"</div>" +
			"</div>" +
			"</div>";
	});

	return li;
}

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
			"</div>";
		li += createBootstrapCarousel(JSON.parse(product.images));
		li += "<div class=\"mb-2\">" +
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
			(regist_date.getTime() === update_date.getTime() ? '' : "<p class=\"fw-light fst-italic m-0\">" + dateTimeDiff(update_date, today) + "</p>") +
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

	if (dateTimeJSON.year !== 0) {
		return dateTimeJSON.year + "년 전 수정됨";
	}
	if (dateTimeJSON.month !== 0) {
		return dateTimeJSON.month + "개월 전 수정됨";
	}
	if (dateTimeJSON.day !== 0) {
		return dateTimeJSON.day + "일 전 수정됨";
	}
	if (dateTimeJSON.hours !== 0) {
		return dateTimeJSON.hours + "시간 전 수정됨";
	}
	if (dateTimeJSON.minute !== 0) {
		return dateTimeJSON.minute + "분 전 수정됨";
	}
	if (dateTimeJSON.seconds !== 0) {
		return dateTimeJSON.seconds + "초 전 수정됨";
	}
	return "방금 전 수정됨";
}
