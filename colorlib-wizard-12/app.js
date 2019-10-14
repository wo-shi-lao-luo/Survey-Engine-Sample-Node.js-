const express = require('express');
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const app = express();

const server = http.createServer(app);

var index = fs.readFileSync(__dirname + '/index.html', 'utf-8');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	var data = ejs.render(index);
	res.send(data);
});

server.listen(22, 'localhost');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});