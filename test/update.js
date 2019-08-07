var path = require("path");
var assert = require("assert");
var user = require("..")(path.join(__dirname, "data/user.json"));

describe("node-localdb", function() {
  describe("#update()", function() {
    before(function() {
      // remove all data
      user.remove({}).then(function() {});
    });
    after(function() {
      // remove all data
      user.remove({}).then(function() {});
    });

    it("should hash method of #update()", function() {
      assert.notEqual(undefined, user.update);
      assert.equal("function", typeof user.update);
    });
    it("should return object properties updated after calling update function", function(done) {
      user
        .insert({ username: "jf", password: "123" })
        .then(function(u) {
          assert.notEqual(undefined, u);
          assert.notEqual(undefined, u.username);
          assert.notEqual(undefined, u.password);
          assert.equal("jf", u.username);
          assert.equal("123", u.password);
          assert.notEqual(undefined, u._id);
        })
        .then(function() {
          user.update(
            { username: "jf" },
            { username: "jfk", password: "1234", extraProp: "yeah!" }
          );
        })
        .then(function() {
          user.findOne({ username: "jfk" }).then(function(u) {
            assert.notEqual(undefined, u);
            assert.equal("jfk", u.username);
            assert.equal("1234", u.password);
            assert.equal("yeah!", u.extraProp);
            done();
          });
        });
    });
  });
});
