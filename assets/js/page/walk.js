$(document).ready(function() {

    function getStep(step) {
        Rx.getJSON('/step/?order=' + step + '&path=' + window.path)
            .subscribe(
                function(data) {
                    // Log data length
                    console.log(data, data.length);

                },
                function(err) {
                    // Log the error
                }
            );
    }

    $('#continue').clickAsObservable()
        .throttle(500 /* ms */ )
        .map(function(ev) {
            return getStep($(ev.target).attr("data-step"));
        });

});
