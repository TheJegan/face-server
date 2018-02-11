"use strict";
var app = require('../app');
var init = require('express-init');
var port = 3000;
app.set('port', port);
var server = null;
var http = require('http');
server = http.createServer(app);
init(app, function (error) {
    if (error) {
        console.log('Error initializing the Express app: ' + error);
        throw new Error(error);
    }
    server.listen(port);
});
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var normalizedPort = parseInt(val, 10);
    if (isNaN(normalizedPort)) {
        return val;
    }
    if (normalizedPort >= 0) {
        return normalizedPort;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
//# sourceMappingURL=www.js.map