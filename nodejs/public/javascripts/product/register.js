$("#productRegiserFormFile").on('change', (e) => {
	$("#productRegiserFormFilePreview").html('');

	// console.log($(e.target.files));
	for (const file of e.target.files) {

		let reader = new FileReader();
		reader.onload = function () {
			let imageTag = new Image();
			imageTag.height = 100;
			imageTag.title = file.name;
			imageTag.src = this.result;
			$("#productRegiserFormFilePreview").append(imageTag);
		};

		reader.readAsDataURL(file);
		// console.log(file);
		// const src = URL.createObjectURL(file);

		// $("#productRegiserFormFilePreview").append("<img src='" + src + "' />")

		// $("#productRegiserFormFilePreview").on("load", () => {
		// 	URL.revokeObjectURL(src) // free memory
		// });
	}
});

$("#productRegistrationSubmitBtn").click(function (e) {

	// console.log($("#productRegiserFormFile")[0].files);

	$(".overlay").toggleClass('visually-hidden');

	// let form = $("#productRegisterForm")[0];
	// let formData = new FormData(form);
	// console.log(form);
	// console.log(formData);

	// let keys = formData.keys();
	// for (const pair of keys) {
	// 	console.log(pair);
	// }

	const product = {
		name: $("#productRegisterForm input[name='name']").val(),
		details: $("#productRegisterForm textarea[name='details']").val(),
		images: []
	}

	const images = $(document).find('#productRegiserFormFilePreview img').toArray();
	for (const image of images) {
		product.images.push({ src: image.src });
	}

	console.log(product);

	$.ajax({
		type: "POST",
		url: "/product/registration",
		// processData: false,
		data: {
			name: product.name,
			details: product.details,
			images: product.images
		},
		// data: formData,
		success: async function (data) {
			console.log(data);
			$("#productRegisterForm input[name='name']").val('');
			$("#productRegisterForm textarea[name='details']").val('');
			await getProductList();
			setTimeout(function () {
				$(".overlay").toggleClass('visually-hidden');
			}, 500);
		}
	});

});
