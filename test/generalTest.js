var request = require('request');

describe('A suite', function() {
  it('contains spec with an expectation', function() {
    expect(true).toBe(true);
  });

  it('should pass this test', function() {
    expect(1).toBe(1);
  });

  it('should have html doc', function(done) {
    request('http://localhost:28096', function(error, response, body){
      console.log(response);
      console.log(body);
      expect(body).toEqual('hello world');
      done();
    });
  });
});
