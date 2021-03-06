function getQueryStringValue (key) {
	return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

var editor = ace.edit("editor");

editor.$blockScrolling = Infinity;

editor.editing = getQueryStringValue("editor") === 'true';

editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

editor.getSession().on('change', function(e) {
	if (editor.editing && connection.readyState == 1) {
		var msg = {
			data: editor.getValue()
		};
		connection.send(JSON.stringify(msg));
	}
});

editor.getSession().selection.on('changeCursor', function(e) {
	if (editor.editing && connection.readyState == 1) {
		var msg = {
			cursor: editor.selection.getCursor()
		};
		connection.send(JSON.stringify(msg));
	}
});

if (!editor.editing)
	editor.setReadOnly(true);

if (editor.editing)
	editor.setValue("function bootstrap () {\n    var a = 1;\n}");