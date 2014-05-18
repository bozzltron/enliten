
// window.response = {};

// var places = [
// 	{ server:'localhost:1337', extension:'/path/'}
// ];

// // Iterate the things
// places.forEach(function(place) {

// 	// Get the things
// 	var xhr = new XMLHttpRequest();
// 	xhr.open("GET", "http://" + place.server + place.extension, true);
// 	xhr.onreadystatechange = function() {
// 		if (xhr.readyState == 4) {
// 			console.log('here');
// 			console.log(xhr.responseText);
// 			// Store the things
// 			window.response = JSON.parse(xhr.responseText)		
			
// 		}
// 	}
// 	xhr.send();

// });

// Append a script from a file in your extension
function appendScript(tabId, changeInfo, tab) {

   	//if(!window.ENLIGHTEN) {
	   var script = document.createElement('script');
	   script.setAttribute("type", "application/javascript");
	   script.setAttribute("src", chrome.extension.getURL("navigator.js"));
	   document.documentElement.appendChild(script); // run the script
	//}
}

chrome.tabs.onCreated.addListener(appendScript);

chrome.tabs.onUpdated.addListener(appendScript);

