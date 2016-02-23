var mongo = require('mongodb');
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/galvanize_war_room';

(function connect() {
  mongo.MongoClient.connect(url, function(err, db) {
    if (err) {
      db.close();
      connect();
    } else {
      module.exports.collection = db.collection;
      module.exports.ObjectId = mongo.ObjectId;
    }
  });
})();
