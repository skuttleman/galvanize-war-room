var mongo = require('../db/mongo');

module.exports = {
  update: function(array) {
    return Promise.all(array.map(insertOrReturn)).then(statisticize);
  }
};

function insertOrReturn(server) {
  return new Promise(function(resolve, reject) {
    mongo.collection('servers').findOne({ id: server.id }, findOneCB(server, resolve, reject));
  });
}

function statisticize(array) {
  array.forEach(updateAverage);
  return Promise.all(array.map(updateServer));
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
  return new Promise(function(resolve, reject) {
    var where = { id: server.id };
    var update = {
      $set: {
        average: server.average,
        responseTime: server.responseTime
      }
    };
    mongo.collection('servers').update(where, update, updateCB(server, resolve, reject));
  }).then(function() {
    return server;
  });
}

function findOneCB(server, resolve, reject)  {
  console.log('here');
  return function(err, data) {
    if (err) {
      console.log('findOneCB');
      reject(err);
    } else if (data) {
      data.responseTime = server.responseTime;
      resolve(data);
    } else {
      mongo.collection('servers').insert(server, insertCB(server, resolve, reject));
    }
  };
}

function insertCB(server, resolve, reject) {
  return function(err, data) {
    if (err) {
      console.log('insertCB');
      reject(err);
    } else {
      resolve(server);
    }
  };
}

function updateCB(server, resolve, reject) {
  return function(err, data) {
    if (err) {
      console.log('updateCB');
      reject(err);
    } else {
      resolve(data);
    }
  };
}
