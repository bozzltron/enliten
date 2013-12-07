

$(document).on("ready", function() {

	var bg = chrome.extension.getBackgroundPage();

	console.log(bg.response);
  	// Render
  	var template = _.template('<h1><%= name %></h1><p><%= description %></p>');

	$('.content').html(template(bg.response));


});