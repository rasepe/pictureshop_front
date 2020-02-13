var currentShop;

function loadIds(shopId) {
	var constructedUrl = "http://localhost:8080/shops/";

	//var result;
	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			manage(data,shopId);

		},
		error: function(){
			alert("json not found");
		}
	});


}

function addNewShop() {

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

function seeAllShops() {

	var constructedUrl = "http://localhost:8080/shops/";

	//var result;
	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			print(data, "listShops");

		},
		error: function(){
			alert("json not found");
		}
	});


}


function getShopById() {
	
//	var currentShopId = document.getElementById("shopId")[document.getElementById("shopId").selectedIndex].value;

	//var constructedUrl = "http://localhost:8080/shops/"

		$.ajax({
			type: "GET",
			url: "http://localhost:8080/shops/",
			success: function(respuesta) {
				console.log(respuesta);
			},
			error: function() {
		        console.log("No se ha podido obtener la informacion");
		    }
		});
	


}

function seeRole() {

	var role = document.getElementById("role")[document.getElementById("role").selectedIndex].value;
	var constructedUrl = "http://localhost:8080/employees/role/";

	var result;
	$.ajax({
		type: "GET",
		url: constructedUrl + role,
		success: function(data) {

			print(data, "resultRole");

		},
		error: function(){
			alert("json not found");
		}
	});


}



function getCurrentShop(data) {
	currentShop = {
			name: data.name,
			maxPictures: data.maxPictures
		}
		
		console.log(currentShop);
}


function getCurrentShop(shop){
	
	currentShop = {
		name: JSONParse(shop).name,
		maxPictures: JSONParse(shop).maxPictures
	}
	
	console.log(currentShop);
}

function manage(objects,shopId) {
	var options;
	for (var i=0; i<objects.content.length; i++) {
		options += '<option value="'+objects.content[i].id+'">'+objects.content[i].id+'</option>';	
	}
	document.getElementById(shopId).innerHTML = options;
}


//editEmployee = JSON.stringify(editEmployee) + '{"id":'+editId+'}';  (al reves)

//(@NotNull String author, String name, @NotNull double price, Shop shop)

function addNewPicture() {

	var newPictureAuthor = document.getElementById("pictureAuthor").value;
	var newPictureName = document.getElementById("pictureName").value;
	var newPicturePrice = parseFloat(document.getElementById("picturePrice").value);
    var currentShopId = document.getElementById("shopId")[document.getElementById("shopId").selectedIndex].value;
    //var currentShop = getShopById(currentShopId);
    getShopById(currentShopId);
    console.log(currentShop);
    
    var newPicture;
    
//    if (newPictureAuthor == "") {
//    	newPicture = {
//    			author = null,
//    			name = newPictureName,
//    			price = newPicturePrice,
//    			shop = currentShop
//    	}
//    } else {
//    	newPicture = {
//    			author = newPictureAuthor,
//    			name = newPictureName,
//    			price = newPicturePrice,
//    			shop = currentShop
//    	}
//    }
    
    newPicture = {
    		author: newPictureAuthor,
			name: newPictureName,
			price: newPicturePrice,
			shop: currentShop
	}

    var constructedURL = "http://localhost:8080/shops/" + currentShopId + "/pictures";
	//console.log(newEmployee);


	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: constructedURL,
		data:  '{"id":'+currentShopId+'}' + JSON.stringify(newPicture), 
		success: function(data) {

		},
		error: function(){
			alert("json not found");
		}
	});

}

function print(objects, id) {

	var result = "";
	if (objects.length>0) {
		for (var i=0; i<objects.length; i++) {
			result += JSON.stringify(objects[i])+"<br>";
		}

	}
	else {
		result = "NO RESULTS";
	}
	document.getElementById(id).innerHTML = result;
}