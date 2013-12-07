
window.response = {};

var places = [
	{ server:'localhost:1337', extension:'/path/2'}
];

// Iterate the things
places.forEach(function(place) {

	// Get the things
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://" + place.server + place.extension, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			console.log('here');
			console.log(xhr.responseText);
			// Store the things
			window.response = JSON.parse(xhr.responseText)		
			
		}
	}
	xhr.send();

});



