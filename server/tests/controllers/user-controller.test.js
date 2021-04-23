const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const userModel = require('../../models/user');
const userController = require('../../controllers/user-controller');

describe('get user test route', function() {
  it('should return a message from user_test', function() {
    let req = {}
    let res = {
      send: sinon.spy()
    }

    userController.user_test(req, res);
    console.log(res.send);
    expect(res.send.calledOnce).to.be.true;
  });
});