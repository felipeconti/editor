var server = require('http').createServer();
var url = require('url');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });
var express = require('express');
var app = express();
var port = process.env.PORT || process.argv[2] || 8084;

var data;

app.use(express.static(__dirname + "/public"));
 
wss.on('connection', function connection(ws) {
	// var location = url.parse(ws.upgradeReq.url, true);
	// you might use location.query.access_token to authenticate or share sessions 
	// or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 
 
	if (ws.protocol != "training")
		ws.close(1002, 'Not training!');

	ws.on('message', function incoming(message) {
		data = message;

		wss.clients.forEach(function each(client) {
			client.send(data);
		});
	});

	ws.on('close', function(reasonCode, description) {
		console.log((new Date()) + ' Peer disconnected.');
	});

	if (data) ws.send(data);
});
 
server.on('request', app);
server.listen(port, function () {
	console.log('Listening on ' + server.address().port);
});