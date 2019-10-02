const routes = require('express').Router();

const fs = require('fs');
const ejs = require('ejs');

// const mysql = require('./mysql');

var index = fs.readFileSync(__dirname + '/pages/index.ejs', 'utf-8');
var questions = fs.readFileSync(__dirname + '/pages/questions.ejs', 'utf-8');
var top = fs.readFileSync(__dirname + '/pages/top.ejs', 'utf-8');


// var partials = {head, nav, sidebar, breadcrumbs, logout, footer, bodyjs, sessionS, sessionF};

routes.get('/', function(req, res) {
	var data = ejs.render(index, {questions, top});
	res.send(data);
});


module.exports = routes;