
//alert("injected");
window.onload = function() {
	window.ELIGHTEN = {};
	alert("window loaded");
}

var div = document.createElement("div");
div.style = "position:fixed; bottom:0px; width:100%; height:20px;";
div.innerHTML = "Mouse";
document.body.appendChild(div);