var util = require("./util");
var crud = require("./crud");
var frisby = require("frisby");
var config = require("./config");

// Jasmine test
describe('Status', function(){

    it('should prevent POST without session', function() {

        frisby.create('Prevent user creation from POST')
            .post(config.server + '/status',{
                name: "Path without session",
                description: "test",
            })
            .expectStatus(403)
        .toss()

    })

    it('should prevent read without session', function() {

        frisby.create('Read all paths without session')
            .get(config.server + '/status')
            .expectStatus(403)
        .toss()

    })

    it('should prevent updates without session', function() {

        frisby.create('Try an update without session')
            .put(config.server + '/status/123', {})
            .expectStatus(403)
        .toss()

    })

    it('should prevent delete without session', function() {

        frisby.create('Try an update without session')
            .delete(config.server + '/status/123', {})
            .expectStatus(403)
        .toss()

    })

    it('should support CRUD', function(){

        crud({
            module: "status",
            postData: {
                "user":        "1234",
                "step": 1,
                "isCompleted": false,
                "path": "1512412"
            },
            validateReadAllTypes: {             
            },
            validateReadTypes:{ 
                user: String,
                step: Number,
                isCompleted: Boolean,
                path: String
            },
            patchData: {
                "user":        "1234",
                "step": 2,
                "isCompleted": false,
                "path": "1512412"
            }
        })

    })  

});
