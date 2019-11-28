const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
const session = require('express-session');
const routes = require('./routes');

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       	// to support JSON-encoded bodies
app.use( bodyParser.urlencoded ({     	// to support URL-encoded bodies
	extended: true
})); 

app.set('trust proxy', 1) // trust first proxy
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}))

app.use(express.static(__dirname + '/public'));
app.use('/', routes);

server.listen(3000, '0.0.0.0');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});