var Sails = require('sails'),
    sails;

before(function(done) {

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(5000);

    Sails.lift({
        // configuration for testing purposes

        // use a different port
        port: 3002,

        // use a different mongo connection
        models: {
            connection: 'test'
        }
    }, function(err, server) {
        sails = server;
        if (err) return done(err);
        // here you can load fixtures, etc.
        done(err, sails);
    });
});

after(function(done) {
    //Path.destroy({});
    //Step.destroy({});
    // here you can clear fixtures, etc.
    Sails.lower(done);
});
