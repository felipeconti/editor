var editor = ace.edit("editor");

editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

editor.getSession().on('change', function(e) {
    connection.send(editor.getValue());
});

editor.setValue("function bootstrap () {\n    var a = 1;\n}");