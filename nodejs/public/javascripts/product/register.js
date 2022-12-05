// const Editor = toastui.Editor;

// const editor = new Editor({
// 	el: document.querySelector('#editor'),
// 	height: '200px',
// 	initialEditType: 'markdown',
// 	previewStyle: 'vertical',
// 	language: 'ko-KR'
// });

// editor.getHTML()
const productRegisterFormFilePreview = $("#productRegisterFormFilePreview");

$("#productRegisterFormFile").on('change', (e) => {
	productRegisterFormFilePreview.html('');

	// console.log($(e.target.files));
	for (const file of e.target.files) {

		let reader = new FileReader();
		reader.onload = function () {
			let imageTag = new Image();
			// imageTag.height = 100;
			imageTag.title = file.name;
			imageTag.classList.add('img-fluid', 'mb-1');
			imageTag.src = this.result;
			$("#productRegisterFormFilePreview").append(imageTag);
		};
		reader.readAsDataURL(file);
	}
});


$("#productRegistrationSubmitBtn").click(function () {

	// $(".overlay").toggleClass('visually-hidden');

	// const product = {
	// 	name: $("#collapseProductRegister input[name='name']").val(),
	// 	details: $("#collapseProductRegister textarea[name='details']").val(),
	// 	images: $('#productRegisterFormFile').prop('files')
	// }

	// const images = $(document).find('#productRegisterFormFilePreview img').toArray();
	// for (const image of images) {
	// 	product.images.push({ src: image.src });
	// }
	//
	// console.log($('#productRegisterFormFile'));
	// console.log($('#productRegisterFormFile').val());
	// console.log($('#productRegisterFormFile').prop('files'));

	$.ajax({
		type: "POST",
		url: "/api/product/registration",
		data: {
			name: $("#collapseProductRegister input[name='name']").val(),
			details: $("#collapseProductRegister textarea[name='details']").val(),
			// images: $('#productRegisterFormFile').prop('files')
		},
		success: async function (data) {
			console.log(data);
			$("#productRegisterForm input[name='name']").val('');
			$("#productRegisterForm textarea[name='details']").val('');
			await getProductList();
			$('#collapseProductRegister').collapse("toggle");
			// setTimeout(function () {
			// 	$(".overlay").toggleClass('visually-hidden');
			// }, 500);
		},
		error: async function (xhr) {
			console.error(xhr.responseText);
		}
	});

});
