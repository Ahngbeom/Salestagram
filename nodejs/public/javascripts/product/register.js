$("#productRegistrationSubmitBtn").click(function (e) {

	// const today = new Date();
	// console.log(today.toJSON());
	// console.log(new Date(today.toJSON()));
	// console.log(today.toLocaleString());

	$.ajax({
		type: "POST",
		url: "/product/registration",
		data: {
			name: $("#productRegisterForm input[name='name']").val(),
			details: $("#productRegisterForm textarea[name='details']").val()
		},
		success: function (data) {
			console.log(data);
			$("#productRegisterForm input[name='name']").val('');
			$("#productRegisterForm textarea[name='details']").val('');
			getProductList();
		}
	});
});
