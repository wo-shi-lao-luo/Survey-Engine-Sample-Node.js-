var form = new FormData();
var send = document.querySelector("#send");
send.onclick = function() {
	e = document.getElementById('test');
	form.append("value", e);
	console.log(form.values());
	return;
}