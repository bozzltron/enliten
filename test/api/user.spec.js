var util = require("./util");
var crud = require("./crud");
var frisby = require("frisby");
var config = require("./config");

// Jasmine test
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

  it('should prevent PUT', function(){

    frisby.create('Prevent user put')
      .put(config.server + '/user')
        .expectStatus(404)
    .toss()

  })

  it('should prevent DELETE', function(){

    frisby.create('Prevent user delete')
      .delete(config.server + '/user')
        .expectStatus(404)
    .toss()

  })  

  it('should allow login', function(){

    frisby.create('Allow user login')
      .post(config.server + '/login')
        .expectStatus(200)
    .toss()

  })

  it('should allow register', function(){

    frisby.create('Allow user registeration')
      .post(config.server + '/register')
        .expectStatus(200)
    .toss()

  })
  
  it('should allow profile', function(){

    frisby.create('Allow user profile')
      .get(config.server + '/profile')
        .expectStatus(200)
    .toss()

  })

  it('should allow session', function(){

    frisby.create('Allow user session')
      .get(config.server + '/session')
        .expectStatus(200)
    .toss()

  })

  it('should allow logout', function(){

    frisby.create('Allow user logout')
      .get(config.server + '/logout')
        .expectStatus(200)
    .toss()

  })

});
