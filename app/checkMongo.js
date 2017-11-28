// checkMongo.js

var mongo = require("mongodb").MongoClient, db_url = process.env.MONGOLAB_URI;

module.exports = {
  update: function(term) {
    mongo.connect(db_url, function(err, db) {
      if (err) throw err;
      var collection = db.collection("image_search");
      var when = Date();
      var nextID;
      collection.count({}, function(err, data) {
        if (err) throw err;
        nextID =  data;
        var entry = {_id: nextID, term: term, when: when};
        collection.insertOne(entry, function(err, result) {
          console.log(nextID);
          if (err) throw err;
          console.log("DB updated!");
          db.close();
        });
      });
    });
  },
  fetch: function(callback) {
    mongo.connect(db_url, function(err, db) {
      if (err) throw err;
      var collection = db.collection("image_search");
      collection.find({}, {_id: 0}).sort({_id: -1}).limit(10).toArray(function(err, result) {
        if (err) throw err;
        console.log("DB checked!");
        callback(result);
        db.close();
      })
    })
  }
};