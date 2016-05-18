var connection = new WebSocket('ws://'+document.location.host+'/', 'training');

connection.onerror = function (error) {
	console.log('WebSocket Error ' + error);
};

connection.onmessage = function (message) {
	var code = document.querySelector("code");
	code.innerHTML = message.data;
	hljs.highlightBlock(code);
};