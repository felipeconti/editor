var server = require('http').createServer();
var url = require('url');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });
var express = require('express');
var app = express();
var port = 8080;
 
app.use(express.static(__dirname + "/public"));
 
wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    // you might use location.query.access_token to authenticate or share sessions 
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 
 
    ws.on('message', function incoming(message) {
        // console.log('received: %s', message);

        wss.clients.forEach(function each(client) {
            client.send(message);
        });
    });

    ws.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
 
server.on('request', app);
server.listen(port, function () {
    console.log('Listening on ' + server.address().port);
});