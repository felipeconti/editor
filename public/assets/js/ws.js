var connection = new WebSocket('ws://'+document.location.host+'/', 'training');

connection.onerror = function (error) {
	console.log('WebSocket Error ' + error);
};

connection.onmessage = function (message) {
	if (!editor.editing) {
		editor.setValue(message.data);
		editor.gotoLine(0);
	}
};