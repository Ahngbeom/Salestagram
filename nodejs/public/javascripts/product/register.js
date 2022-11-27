// const Editor = toastui.Editor;

// const editor = new Editor({
// 	el: document.querySelector('#editor'),
// 	height: '200px',
// 	initialEditType: 'markdown',
// 	previewStyle: 'vertical',
// 	language: 'ko-KR'
// });

// editor.getHTML()

$("#productRegiserFormFile").on('change', (e) => {
	$("#productRegiserFormFilePreview").html('');

	// console.log($(e.target.files));
	for (const file of e.target.files) {

		let reader = new FileReader();
		reader.onload = function () {
			let imageTag = new Image();
			// imageTag.height = 100;
			imageTag.title = file.name;
			imageTag.classList.add('img-fluid', 'mb-1');
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


$("#productRegistrationSubmitBtn").click(function () {

	const bsCollapse = new bootstrap.Collapse('#collapseProductRegister');

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
		name: $("#collapseProductRegister input[name='name']").val(),
		details: $("#collapseProductRegister textarea[name='details']").val(),
		images: []
	}

	const images = $(document).find('#productRegiserFormFilePreview img').toArray();
	for (const image of images) {
		product.images.push({ src: image.src });
	}

	console.log(product);

	$.ajax({
		type: "POST",
		url: "/api/product/registration",
		data: {
			name: product.name,
			details: product.details,
			images: product.images
		},
		success: async function (data) {
			console.log(data);
			$("#productRegisterForm input[name='name']").val('');
			$("#productRegisterForm textarea[name='details']").val('');
			await getProductList();
			setTimeout(function () {
				$(".overlay").toggleClass('visually-hidden');
				bsCollapse.hide();
			}, 500);
			
		}
	});

});
