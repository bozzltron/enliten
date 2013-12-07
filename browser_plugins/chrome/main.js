

$(document).on("ready", function() {

	var bg = chrome.extension.getBackgroundPage();

	var pathView;

	console.log(bg.response);  	

	var Model = Backbone.Model.extend({
		"urlRoot": "http://localhost:1337/path/"
	});

	var Paths = Backbone.Collection.extend({
		"url": "http://localhost:1337/path/"
	});

	var MainView = Backbone.View.extend({

		initialize: function(){
			_.bindAll(this, 'render', 'showPath');
			this.collection = new Paths();
			this.collection.fetch({success:this.render});
			this.collection.on('change', this.render);
			console.log('init');
		},

		events: {
			'click .step' : 'showPath'
		},

		render: function(){
			console.log("render");
		  	this.template = _.template('' +
		  		'<h2>Paths</h2><ul>' +
		  		'<% _.each(paths, function(path) { %>' +
		  		'    <li><a href="javascript:;" class="step" data-id="<%= path.id %>"><%= path.name %></a></li>' +
		  		'<% }); %>' +
		  		'</ul>'
		  	);

		  	this.$el.html(this.template({paths:this.collection.toJSON()}));

	  	},

	  	showPath: function(e) {
	  		e.preventDefault();
	  		var id = $(e.target).attr('data-id');
	  		var model = this.collection.get(id);
	  		pathView = new PathView({el: $(".content:first"), model:model}).render();
	  	}

	});

	var PathView = Backbone.View.extend({

		initialize: function(options) {
			_.bindAll(this, 'render', 'back');
			console.log(options);
		},

		events: {
			'click .back': 'back',
			'click .begin': 'begin'
		},

		render: function(){
			this.template = _.template(''+
				'<a class="btn back" href="javascript:;"><< Back</a>' +
		  		'<h1><%= name %></h1><p><%= description %></p>' +
		  		'<ul>' +
		  		'<% _.each(steps, function(step) { %>' +
		  		'    <li><%= step.title%></li>' +
		  		'<% }); %>' +
		  		'</ul>' + 
		  		'<a class="btn begin" href="javascript:;">Start</a>'
		  	);

		  	this.$el.html(this.template(this.model.toJSON()));
		},

		back: function(e) {
			e.preventDefault();
			mainView.render();
		},

		begin: function(e) {
			e.preventDefault();
			new StepView({el:$('.content:first'), model:this.model});
		}	

	});

	var StepView = Backbone.View.extend({

		initialize: function(options) {
			_.bindAll(this, 'render', 'back', 'setTab');
			this.steps = this.model.get('steps');
			this.step = 0;
			this.render();
		},

		events: {
			'click .back': 'back',
			'click .next': 'next',
			'click .home': 'home'
		},

		render: function(){

			var url = this.steps[this.step].url;

			if(!this.tab) {
				chrome.tabs.create({ 'url': url }, this.setTab);
			} else {
				chrome.tabs.update(this.tab.id, {'url': url});
			}

			this.template = _.template(''+
				'<a class="btn back" href="javascript:;"><< Back</a>' +
		  		'<h1><%= name %></h1><p><%= description %></p>' +
		  		'<h2>Step <%= stepNum %></h2>' +
		  		'<h3><%= step.title %></h3>' +
		  		'<p><%= step.notes %></p>' +
		  		'<% if(hasNext) { %>' +
		  		'    <a class="btn next" href="javascript:;">Next</a>' +
		  		'<% } else { %>' +
		  		'    <p>You\'ve completed this path <a class="home" href="javascript:;">View the path menu</a> for more.</p>' +
		  		'<% } %>'
		  	);

		  	var data = this.model.toJSON();
		  	data.stepNum = this.step + 1;
		  	data.step = data.steps[this.step];
		  	data.hasNext = (data.steps.length > this.step + 1);

		  	this.$el.html(this.template(data));
		},

		back: function(e) {
			e.preventDefault();
			pathView.render();
		},

		next: function(e) {
			e.preventDefault();
			this.step++;
			this.render();
		},

		setTab: function(tab) {
			console.log(tab);
			this.tab = tab;
		},

		home: function(e) {
			e.preventDefault();
			mainView.render();
		}

	});

	var mainView = new MainView({el:$(".content:first"), paths:bg.response});

});