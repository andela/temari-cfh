'use strict';
global.expect = require('chai').expect;

//jasmine test suite
describe('Demo test', function() {
  // it function for the spec
  it('should expect true to be true', function() {
    //expect assertion function
    expect(true).to.equal(true);
  });
});
