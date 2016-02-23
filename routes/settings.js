var route = require('express').Router();
var mongo = require('../db/mongo');

module.exports = route;

route.get('/', function(request, response, next) {
  mongo.connect().then(function(db) {
    db.collection('settings').findOne({}, function(err, data) {
      db.close();
      if (err) next(err);
      else {
        response.json({ settings: data });
      }
    });
  }).catch(next);
});

route.put('/', function(request, response, next) {
  mongo.connect().then(function(db) {
    db.collection('settings').update({}, { $set: request.body }, function(err, data) {
      db.close();
      if (err) next(err);
      else {
        response.json({ success: true });
      }
    });
  }).catch(next);
});
