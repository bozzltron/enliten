$(document).ready(function() {

    var step = null;
    var order = 1;

    $("#continue").click(function() {

        $.get('/step/query/?' + $.param({
            path: path,
            order: order
        }), function(step) {
            console.log('step', step);
        });

    });


});
