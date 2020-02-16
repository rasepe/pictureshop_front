
var arrayShops = new Array();
var arrayShopIds = new Array();

	

function loadIds(shopId) {
	var constructedUrl = "http://localhost:8080/shops/";


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


	console.log(newShop);
	demo();

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://localhost:8080/shops",
		data: JSON.stringify(newShop),    
		success: function(data) {
			console.log("success");
		},
		error: function(){
			alert("json not found");
		}
	});

}

function seeAllShops() {

	var constructedUrl = "http://localhost:8080/shops/";


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


function listPictures() {
	
	var currentShopId = document.getElementById("shopId")[document.getElementById("shopId").selectedIndex].value;

	var constructedUrl = "http://localhost:8080/shops/" + currentShopId + "/pictures";

	console.log(constructedUrl);

	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			print(data, "pictureList");

		},
		error: function(){
			alert("json not found");
		}
	});


}



function deletePictures() {
	
	
	var currentShopId = document.getElementById("shopId")[document.getElementById("shopId").selectedIndex].value;
	var constructedUrl = "http://localhost:8080/shops/" + currentShopId + "/pictures";
		
		$.ajax({
			type: "DELETE",
			contentType: "application/json",
			url: constructedUrl,
			data: currentShopId, 
			success: function(data) {
			

			},
			error: function(){
				alert("json not found");
			}
		});
		

}



function manage(objects,shopId) {
	var options;
	for (var i=0; i<objects.content.length; i++) {
		options += '<option value="'+objects.content[i].id+'">'+objects.content[i].id+'</option>';	
		arrayShops.push(objects.content[i]);
	}
	document.getElementById(shopId).innerHTML = options;
}



function addNewPicture() {

	
	var newPictureAuthor = document.getElementById("pictureAuthor").value;
	var newPictureName = document.getElementById("pictureName").value;
	var newPicturePrice = parseFloat(document.getElementById("picturePrice").value);
    var currentShopId = document.getElementById("shopId")[document.getElementById("shopId").selectedIndex].value;
    var currentShop = arrayShops[currentShopId-1];
    
    cleanFields();

    
   var newPicture = {
    		author: newPictureAuthor,
			name: newPictureName,
			price: newPicturePrice,
			shop: currentShop
	}

    var constructedURL = "http://localhost:8080/shops/" + currentShopId + "/pictures";
	

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: constructedURL,
		data: JSON.stringify(newPicture),  //params,  // '{"id":'+currentShopId+'}' + JSON.stringify(newPicture), 
		success: function(data) {
			console.log("success");
		},
		error: function(){
			alert("json not found");
		}
	});

}

function cleanFields(){
	document.getElementById("pictureAuthor").value="";
	document.getElementById("pictureName").value="";
	document.getElementById("picturePrice").value="";
}

function print(objects, id) {

	var result = "";
	if (objects.content.length>0) {
		for (var i=0; i<objects.content.length; i++) {
			result += JSON.stringify(objects.content[i])+"<br>";
		}

	}
	else {
		result = "NO RESULTS";
	}
	document.getElementById(id).innerHTML = result;
}