var code = "function bootstrap () {\n    var a = 1;\n}";

function push() {
	var x = document.getElementById("in");

	connection.send(x.value);
}

function load() {
	document.getElementById("in").innerHTML = code;

	push();
}