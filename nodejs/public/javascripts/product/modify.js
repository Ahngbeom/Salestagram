const productModificationSubmitBtn = $("#productModificationSubmitBtn");

function productFormToggler() {
	$("#productModifyForm").collapse("toggle");
}

function getProductInfo(id) {
	console.log(id);
	$.ajax({
		type: 'get',
		url: '/api/product/info',
		data: {
			id: id
		},
		dataType: 'JSON',
		success: function(data) {
			console.log(data);
		},
		error: function(xhr) {
			console.error(xhr);
		}
	})
}

function SetLayoutForProductModify(e) {

	getProductInfo($(e.target).data('product-id'));

	let product = {
		id: $(e.target).data('product-id'),
		name: '',
		details: ''
	}

	const targetProductListItem = $(e.target.parentElement.parentElement.parentElement);

	targetProductListItem.toggleClass('border border-5 border-warning');

	productFormToggler();

	$("#product-list-area li").each((index, item) => {
		if (!targetProductListItem.is(item)) {
			// console.log(index, item);
			$(item).toggleClass('disabled').toggleClass('opacity-25');
		}
	});

	const originProductName = $(targetProductListItem).find("input[name='name']").val();
	const originProductDetails = $(targetProductListItem).find("input[name='details']").val();

	$("#productModifyForm input[name='name']").val(originProductName);
	$("#productModifyForm textarea[name='details']").val(originProductDetails !== '내용 없음' ? originProductDetails : '');

	$("#returnToList").one('click', () => {
		productFormToggler();
		getProductList();
	});

	productModificationSubmitBtn.one('click', () => {
		product.name = $("#productModifyForm input[name='name']").val();
		product.details = $("#productModifyForm textarea[name='details']").val();
		console.log(product);

		$.ajax({
			type: "POST",
			url: "/product/modify",
			data: product,
			success: function (data) {
				console.log("Modify Product [" + data + "]");
				productFormToggler();
				getProductList();
			},
			error: function (xhr) {
				console.log(xhr);
			}
		});
	});
}

$(document).on('click', ".productModifyBtn", SetLayoutForProductModify);
