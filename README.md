# node-localdb-modern ![](https://travis-ci.org/carlos0202/node-localdb.svg?branch=master)

a very lightweight local json file database for node.js, just for convenience in development environment. Forked and uptated from https://github.com/progrape/node-localdb.

## install

```
npm install node-localdb-modern --save
```

## useage

```javascript
var db = require("node-localdb");
var user = db("path/to/user.json");

// insert
user
  .insert({ username: "jf", password: "123", email: "123@qq.com" })
  .then(function(u) {
    console.log(u); // print user, with a auto generate uuid
  });

// findOne
user.findOne({}).then(function(u) {
  console.log(u); // find the first one user
});
user.findOne({ username: "xx" }).then(function(u) {
  console.log(u); // undefined, because we don't have a user with username 'xx'
});

// find
user.find({}).then(function(us) {
  console.log(us.length); // 1
  console.log(us); // an array with one object
});
user.find({}, { limit: 10, skip: 10 * 2 }).then(function(us) {
  console.log(us); // for pagination
});

// update
user.insert({ username: "jf", password: "123" }).then(function(u) {
  user.update(
    { username: "jf" },
    { username: "jfk", password: "1234", extraProp: "yeah!" }
  );
});

//updateById
user.insert({ username: "pedro", password: "abcde12345" }).then(function(u) {
  userId = u._id; // save auto generated _id
  user.updateById(userId, {
    username: "juan",
    password: "test01",
    isTest: true
  });
});

// count
user.count({}).then(function(count) {
  console.log(count); // 1
});

// remove
user.remove({ username: "jf" }).then(function(u) {
  console.log(u); // the user was remove successfully
});
```

#TODO
Whole detailed documentation. 😅

## License

The MIT License (http://opensource.org/licenses/MIT)
