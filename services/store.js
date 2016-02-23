var mongo = require('../db/mongo');

module.exports = {
  update: function(array) {
    return Promise.all(array.map(insertOrReturn)).then(statisticize);
  }
};

function insertOrReturn(server) {
  return mongo.connect().then(function(db) {
    return new Promise(function(resolve, reject) {
      db.collection('servers').findOne({ id: server.id }, findOneCB(db, server, resolve, reject));
    });
  });
}

function statisticize(array) {
  array.forEach(updateAverage);
  return Promise.all(array.map(updateServer))
}

function updateAverage(server) {
  if (!server.average) {
    server.average = { size: 0, current: 0 };
  }
  var newSize = server.average.size + 1;
  server.average = {
    size: newSize,
    current: (server.average.current * server.average.size + server.responseTime) / newSize
  };
}

function updateServer(server) {
  return mongo.connect().then(function(db) {
    return new Promise(function(resolve, reject) {
      var where = { id: server.id };
      var update = {
        $set: {
          average: server.average,
          responseTime: server.responseTime
        }
      };
      db.collection('servers').update(where, update, updateCB(db, server, resolve, reject));
    });
  }).then(function() {
    return server;
  });
}

function findOneCB(db, server, resolve, reject)  {
  return function(err, data) {
    if (err) {
      db.close();
      reject(err);
    } else if (data) {
      db.close();
      data.responseTime = server.responseTime;
      resolve(data);
    } else {
      db.collection('servers').insert(server, insertCB(db, server, resolve, reject));
    }
  };
}

function insertCB(db, server, resolve, reject) {
  return function(err, data) {
    db.close();
    if (err) return reject(err);
    else resolve(server);
  };
}

function updateCB(db, server, resolve, reject) {
  return function(err, data) {
    db.close();
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  };
}
