function addNew() {

	var newShopName = document.getElementById("name").value;

	var newShopMaxPictures = document.getElementById("maxPictures").value;



	var newShop = {
			"name": newShopName,
			"maxPictures": parseInt(newShopMaxPictures)
	}


	//console.log(newEmployee);


	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://localhost:8080/shops",
		data: JSON.stringify(newShop),    
		success: function(data) {

		},
		error: function(){
			alert("json not found");
		}
	});

}