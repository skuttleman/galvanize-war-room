try {
  require('dotenv').load();
} catch(error) {
  console.log(error);
}
var express = require('express'), app = express();
var server = require('http').Server(app);
require('./services/socket')(server);
var port = process.env.PORT || 8000;

// Serve Angular App
app.use(express.static(__dirname + '/public'));



// Start Server
server.listen(port, function() {
  console.log('Server is listening on port', port);
});


// Error Handling
if (process.env.NODE_ENV === 'development') {
  app.use(function(error, request, response, next) {
    response.status(error.status || 500);
    response.json({
      message: error.message,
      error: error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(error, request, response, next) {
  response.status(error.status || 500);
  response.json({
    message: error.message,
    error: {}
  });
});
