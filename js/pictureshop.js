
var arrayShops = new Array();
var arrayShopIds = new Array();
var counter = 0;

function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function demo() {
	  console.log('Taking a break...');
	  await sleep(2000);
	  console.log('Two seconds later, showing sleep in a loop...');

	  // Sleep in loop
	  for (let i = 0; i < 5; i++) {
	    if (i === 3)
	      await sleep(2000);
	    console.log(i);
	  }
	}

	

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


function listPictures() {
	
	var currentShopId = document.getElementById("shopId")[document.getElementById("shopId").selectedIndex].value;

	var constructedUrl = "http://localhost:8080/shops/" + currentShopId + "/pictures";

	console.log(constructedUrl);
	//var result;
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

function listPictures2() {
	
	var currentShopId = document.getElementById("shopId")[document.getElementById("shopId").selectedIndex].value;

	var constructedUrl = "http://localhost:8080/shops/" + currentShopId + "/pictures";

	console.log(constructedUrl);
	//var result;
	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			getIds(data)

		},
		error: function(){
			alert("json not found");
		}
	});


}

function getIds(data) {
	
	for (var i=0; i<data.content.length; i++) {
	
	arrayShopIds.push(data.content[i].id);
		
	}
	//return arrayShopIds;
}


function deletePictures() {
	
	listPictures2();
	if (counter == 0) {
		document.getElementById("confirmation").innerHTML="Please click again to confirm deletion";
		counter++;
	} else {
		document.getElementById("confirmation").innerHTML="Deletion confirmed";
	}
	//listPictures2();
	console.log(arrayShopIds);
	var currentShopId = document.getElementById("shopId")[document.getElementById("shopId").selectedIndex].value;
	
	for (var i=0; i<arrayShopIds.length; i++) {
		var constructedUrl = "http://localhost:8080/shops/" + currentShopId + "/pictures/" + arrayShopIds[i];
		// /shops/{shopId}/pictures/{pictureId}
		console.log(constructedUrl);
		$.ajax({
			type: "DELETE",
			contentType: "application/json",
			url: constructedUrl,
			data: arrayShopIds[i], 
			success: function(data) {
				console.log("success");
				console.log("esborrem" + i);

			},
			error: function(){
				alert("json not found");
			}
		});	
		
	}
	
}

function deletePictures2() {
	
	
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



function getCurrentShop() {
	
	var currentShopId = document.getElementById("shopId")[document.getElementById("shopId").selectedIndex].value;

	var constructedUrl = "http://localhost:8080/shops/";

	//var result;
	$.ajax({
		type: "GET",
		url: constructedUrl + currentShopId,
		success: function(data) {

			console.log("success");
		},
		error: function(){
			alert("no ha funcionat");
		}
	});


}






/*
function getCurrentShop(shop){
	
	currentShop = {
		name: JSONParse(shop).name,
		maxPictures: JSONParse(shop).maxPictures
	}
	
	console.log(currentShop);
}*/

function manage(objects,shopId) {
	var options;
	for (var i=0; i<objects.content.length; i++) {
		options += '<option value="'+objects.content[i].id+'">'+objects.content[i].id+'</option>';	
		arrayShops.push(objects.content[i]);
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
    var currentShop = arrayShops[currentShopId-1];
    
    cleanFields();
   // getShopById(currentShopId);
    //getCurrentShop();
    //console.log(currentShop);
    
    
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
    
   var newPicture = {
    		author: newPictureAuthor,
			name: newPictureName,
			price: newPicturePrice,
			shop: currentShop
	}

    var constructedURL = "http://localhost:8080/shops/" + currentShopId + "/pictures";
	
   console.log("hola");
   var parameters = '{"shopId":'+currentShopId+',"picture":'+JSON.stringify(newPicture)+'}';
   var parameters2 = '{"shopId":'+currentShopId+'}'+JSON.stringify(newPicture);
   
   var params = '{"shopId":' + currentShopId + ',"picture":' + JSON.stringify(newPicture) + '}';

   console.log(params);

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