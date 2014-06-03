var util = require("./util");
var crud = require("./crud");
var frisby = require("frisby");
var config = require("./config");

// Mocha test
describe('user', function(){

  it('should prevent POST', function() {

    frisby.create('Prevent user creation from POST')
      .post(config.server + '/user')
        .expectStatus(404)
    .toss()

  })

  it('should prevent READ', function(){

    frisby.create('Prevent user read')
      .get(config.server + '/user')
        .expectStatus(404)
    .toss()

  })


});
