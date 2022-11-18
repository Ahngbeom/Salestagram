function productFormToggler() {
	$("#productRegisterForm").toggleClass('visually-hidden');
	$("#productModifyForm").toggleClass('visually-hidden');
}

function SetLayoutForProductModify(e) {

	let product = {
		id: $(e.target).data('product-id'),
		name: '',
		details: ''
	}

	const targetProductListItem = $(e.target.parentElement.parentElement);

	targetProductListItem.toggleClass('border border-warning');

	productFormToggler();

	$("#product-list-area li").each((index, item) => {
		if (!targetProductListItem.is(item)) {
			// console.log(index, item);
			$(item).toggleClass('disabled').toggleClass('opacity-25');
		}
	});

	const originProductName = $(targetProductListItem).find("input[name='name'").val();
	const originProductDetails = $(targetProductListItem).find("input[name='details'").val();

	$("#productModifyForm input[name='name']").val(originProductName);
	$("#productModifyForm textarea[name='details']").val(originProductDetails !== '내용 없음' ? originProductDetails : '');

	$("#returnToList").one('click', () => {
		productFormToggler();
		getProductList();
	});

	$("#productModificationSubmitBtn").one('click', (event) => {
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
