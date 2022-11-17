$("#productRegistrationSubmitBtn").click(function (e) {

	$(".overlay").toggleClass('visually-hidden');

	$.ajax({
		type: "POST",
		url: "/product/registration",
		data: {
			name: $("#productRegisterForm input[name='name']").val(),
			details: $("#productRegisterForm textarea[name='details']").val()
		},
		success: async function (data) {
			console.log(data);
			$("#productRegisterForm input[name='name']").val('');
			$("#productRegisterForm textarea[name='details']").val('');
			await getProductList();
			setTimeout(function () {
				$(".overlay").toggleClass('visually-hidden');
			}, 1000);
		}
	});

});
