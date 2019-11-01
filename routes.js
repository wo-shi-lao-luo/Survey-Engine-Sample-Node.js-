const routes = require('express').Router();

const fs = require('fs');
const ejs = require('ejs');

// const mysql = require('./mysql');

var index = fs.readFileSync(__dirname + '/pages/index.ejs', 'utf-8');
var questions = fs.readFileSync(__dirname + '/pages/questions.ejs', 'utf-8');
var questions2 = fs.readFileSync(__dirname + '/pages/questions2.ejs', 'utf-8');
var cquestions = fs.readFileSync(__dirname + '/pages/common_questions.ejs', 'utf-8');
var recorderjs = fs.readFileSync(__dirname + '/pages/recorderjs.ejs', 'utf-8');
// var top = fs.readFileSync(__dirname + '/pages/top.ejs', 'utf-8');


// var partials = {head, nav, sidebar, breadcrumbs, logout, footer, bodyjs, sessionS, sessionF};

routes.get('/', function(req, res) {
	var condition = Math.round(Math.random());
	if (condition == 0) {
		var data = ejs.render(index, {cquestions, questions});
		res.send(data);
	}
	else {
		var data = ejs.render(index, {cquestions, questions: questions2});
		res.send(data);
	}
});


module.exports = routes;