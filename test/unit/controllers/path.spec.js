var util = require("./util");
var crud = require("./crud");
var frisby = require("frisby");
var config = require("./config");

// Jasmine test
describe('Path', function() {

    it('should prevent POST without session', function() {

        frisby.create('Prevent user creation from POST')
            .post(config.server + '/path', {
                name: "Path without session",
                description: "test",
            })
            .expectStatus(403)
            .toss();

    });

    it('should access Read(s) without session', function() {

        frisby.create('Read all paths without session')
            .get(config.server + '/path')
            .expectStatus(200)
            .afterJSON(function(data) {
                console.log('data', data);
                var id = data[0].id;

                frisby.create('Read a path without session')
                    .get(config.server + '/path/' + id)
                    .expectStatus(200)
                    .toss();

            })
            .toss();

    });

    it('should prevent updates without session', function() {

        frisby.create('Read all paths without session')
            .get(config.server + '/path')
            .expectStatus(200)
            .afterJSON(function(data) {

                // Grab Id of the first path returned
                var id = data[0].id;

                frisby.create('Try an update without session')
                    .put(config.server + '/path/' + id, {})
                    .expectStatus(403)
                    .toss()

            })
            .toss()

    })

    it('should support CRUD', function() {

        crud({
            module: "path",
            postData: {
                "name": "Test path",
                "description": "Test description"
            },
            validateReadAllTypes: {},
            validateReadTypes: {
                name: String,
                description: String
            },
            patchData: {
                "name": "Test Path Updated",
                "description": "Created via integration testing updated"
            }
        })

    })

});
