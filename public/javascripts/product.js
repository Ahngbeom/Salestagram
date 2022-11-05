$.ajax({
	type: "get",
	url: "/product/list",
	dataType: "JSON",
	success: function (response) {
		console.log(response);
	}
});

$("#productRegistrationSubmitBtn").click(function (e) { 
	$.ajax({
		type: "POST",
		url: "/product/registration",
		// contentType: "application/json; charset=utf-8",
		dataType: "JSON",
		data: {
			product_name: "TEST",
			product_details: "TEST..."
		},
		success: function (response) {
			console.log(response);
		}
	});
});

