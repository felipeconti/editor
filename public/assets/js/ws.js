var connection = new WebSocket('ws://'+document.location.host+'/', 'editor');

connection.onerror = function (error) {
	console.log('WebSocket Error ' + error);
};

connection.onmessage = function (message) {
	if (!editor.editing) {
		var msg = JSON.parse(message.data);
		if (msg.data) editor.setValue(msg.data);
		if (msg.cursor) editor.gotoLine(msg.cursor.row+1);
	}
};