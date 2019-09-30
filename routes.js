const routes = require('express').Router();

const fs = require('fs');
const ejs = require('ejs');

const mysql = require('./mysql');

var index = fs.readFileSync(__dirname + '/pages/index.ejs', 'utf-8');
var register = fs.readFileSync(__dirname + '/pages/register.ejs', 'utf-8');
var login = fs.readFileSync(__dirname + '/pages/login.ejs', 'utf-8');

var head = fs.readFileSync(__dirname + '/pages/head.ejs', 'utf-8');
var nav = fs.readFileSync(__dirname + '/pages/nav.ejs', 'utf-8');
var sidebar = fs.readFileSync(__dirname + '/pages/sidebar.ejs', 'utf-8');
var breadcrumbs = fs.readFileSync(__dirname + '/pages/breadcrumbs.ejs', 'utf-8');
var logout = fs.readFileSync(__dirname + '/pages/logout.ejs', 'utf-8');
var footer = fs.readFileSync(__dirname + '/pages/footer.ejs', 'utf-8');
var bodyjs = fs.readFileSync(__dirname + '/pages/bodyjs.ejs', 'utf-8');
var sessionS;
var sessionF;

var partials = {head, nav, sidebar, breadcrumbs, logout, footer, bodyjs, sessionS, sessionF};

routes.get('/', function(req, res) {
	var data = ejs.render(index, partials);
	res.end(data);
});


routes.get('/register', function(req, res) {
	var data = ejs.render(register, partials);
	res.end(data);
});
routes.post('/register', async function(req,res) {
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var cPassword = req.body.cPassword;
	if (password === cPassword) {
		var test = await mysql.addUser(username, email, password);
		console.log(test);
		if ( test === false) {
			res.redirect('/register');
			return false;
		}
		res.redirect("/");
	}
	else {}
})

routes.get('/login', function(req, res) {
	var data = ejs.render(login, partials);
	res.end(data);
});

routes.get('/test', function(req,res) {
	var username = 'aaaa';
	mysql.getUser(username);
	var un2 = "bbbb";
	mysql.getUser(un2);
	var email = "aaa";
	mysql.getEmail(email);
	
})


module.exports = routes;