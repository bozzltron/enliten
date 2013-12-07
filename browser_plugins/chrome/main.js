

$(document).on("ready", function() {

	var bg = chrome.extension.getBackgroundPage();

	console.log(bg.response);
  	// Render

  	var template = _.template(''+
  		'<h1><%= name %></h1><p><%= description %></p>' +
  		'<ul>' +
  		'<% _.each(steps, function(step) { %>' +
  		'    <li><a href="javascript:;" class="step"><%= step.title%></a></li>' +
  		'<% }); %>' +
  		'</ul>'
  	);

	$('.content').html(template(bg.response));


});