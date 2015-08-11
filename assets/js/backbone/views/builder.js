
var BuilderView = Backbone.View.extend({

    initialize: function(){
        console.log('hello!');

        _.bindAll(this, 'handleResult');
        $.get("/templates/result.html", _.bind(function(html){
            console.log("template");
            this.template = _.template(html);
        }, this));
    },

    events: {
        'click button': 'search',
        'submit form': 'noop'
    },

    noop: function(){
        return false;
    },

    search: function(e){
        e.preventDefault();

        var params = $('.form').serialize();
        $.get('http://www.faroo.com/api?' + params + "&key=Dt610xc7abKOq36BZXHDgJGNZ3E_", this.handleResult);
    },

    handleResult: function(res) {
        console.log(res);
        $(".preview").html("");
        _.each(res.results, _.bind(function(result){
            var html = this.template(result);
            $(".preview").append(html);
        }, this));

        if(res.results.length == 0) {
            $('.preview').html('<i class="fa fa-frown-o"></i> Keep looking.');
        }
    }

});

new BuilderView({el:$(".builder")[0]});
