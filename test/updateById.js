var path = require("path");
var assert = require("assert");
var user = require("..")(path.join(__dirname, "data/user.json"));
var userId = -1;

describe("node-localdb", function() {
  describe("#updateById()", function() {
    before(function() {
      // remove all data
      user.remove({}).then(function() {});
    });
    after(function() {
      // remove all data
      user.remove({}).then(function() {});
    });

    it("should hash method of #updateById()", function() {
      assert.notEqual(undefined, user.updateById);
      assert.equal("function", typeof user.updateById);
    });

    it("should create a user and update it", function(done) {
      user
        .insert({ username: "pedro", password: "abcde12345" })
        .then(function(u) {
          userId = u._id; // save auto generated _id

          assert.notEqual(undefined, u);
          assert.notEqual(undefined, u.username);
          assert.notEqual(undefined, u.password);
          assert.equal("pedro", u.username);
          assert.equal("abcde12345", u.password);
          assert.notEqual(undefined, u._id);
        })
        .then(function() {
          user
            .updateById(userId, {
              username: "juan",
              password: "test01",
              isTest: true
            })
            .then(function(u) {
              assert.notEqual(undefined, u);
              assert.notEqual(undefined, u.username);
              assert.notEqual(undefined, u.password);
              assert.notEqual(undefined, u.isTest);
              assert.equal("juan", u.username);
              assert.equal("test01", u.password);
              assert.equal(true, u.isTest);
              assert.notEqual(undefined, u._id);
            });
          done();
        });
    });

    it("should not be able to update non-existing user", function(done) {
      user
        .updateById("-1", {
          username: "test data",
          password: "pwd",
          isActive: false
        })
        .then(function(u) {
          assert.notEqual(undefined, u);
          assert.notEqual(undefined, u.username);
          assert.notEqual(undefined, u.password);
          assert.equal("test data", u.username);
          assert.equal("pwd", u.password);
          assert.equal(false, u.isActive);
          assert.notEqual(undefined, u._id);
        })
        .catch(function(error) {
          assert.equal(
            "no object found with the given _id. Update operation cancelled!",
            error.message
          );
          done();
        });
    });
  });
});
