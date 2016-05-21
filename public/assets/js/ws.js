var connection = new WebSocket('ws://'+document.location.host+'/', 'training');

connection.onerror = function (error) {
	console.log('WebSocket Error ' + error);
};

connection.onmessage = function (message) {
	if (!editor.editing) {
		var msg = JSON.parse(message.data);
		editor.setValue(msg.data);
		editor.gotoLine(msg.cursor.row+1);
	}
};