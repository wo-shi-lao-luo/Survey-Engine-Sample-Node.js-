const routes = require('express').Router();

const fs = require('fs');
const ejs = require('ejs');
const mysql = require('./mysql');

// const mysql = require('./mysql');

var index = fs.readFileSync(__dirname + '/pages/index.ejs', 'utf-8');
var survey1 = fs.readFileSync(__dirname + '/pages/survey1.ejs', 'utf-8');
var survey2 = fs.readFileSync(__dirname + '/pages/survey2.ejs', 'utf-8');
var questions1 = fs.readFileSync(__dirname + '/pages/questions1.ejs', 'utf-8');
var questions2 = fs.readFileSync(__dirname + '/pages/questions2.ejs', 'utf-8');
var cquestions = fs.readFileSync(__dirname + '/pages/common_questions.ejs', 'utf-8');
var recorderjs = fs.readFileSync(__dirname + '/pages/recorderjs.ejs', 'utf-8');
// var top = fs.readFileSync(__dirname + '/pages/top.ejs', 'utf-8');


// var partials = {head, nav, sidebar, breadcrumbs, logout, footer, bodyjs, sessionS, sessionF};

routes.get('/', function(req, res) {
	res.header('Cache-Control','max-age=0');
	var data = ejs.render(index);
	res.send(data);
});

routes.get('/survey1', function(req, res) {
	res.header('Cache-Control','max-age=0');
	var data = ejs.render(survey1, {cquestions, questions1});
	res.send(data);
});
routes.post('/survey1', async function(req,res) {
	var pnum = req.body.pnum;
	var age = req.body.age;
	var gender = req.body.gender;
	var ethnicity = req.body.ethnicity;
	var name = req.body.audio1;
	var birth = req.body.audio2;
	var address = req.body.audio3;
	var email = req.body.audio4;
	var fb = req.body.audio5;
	var fbid = req.body.audio6;
	var phone = req.body.audio7;
	var income = req.body.audio8;
	var cookie = req.body.audio9;
	try {
		await mysql.addRecord('survey1', pnum, age, gender, ethnicity, name, birth, address, email, fb, fbid, phone, income, cookie)
	}
	catch (err) {
		console.log(err);
	}
})

routes.get('/survey2', function(req, res) {
	res.header('Cache-Control','max-age=0');
	var data = ejs.render(survey2, {cquestions, questions2});
	res.send(data);
});
routes.post('/survey2', async function(req,res) {
	var pnum = req.body.pnum;
	var age = req.body.age;
	var gender = req.body.gender;
	var ethnicity = req.body.ethnicity;
	var name = req.body.name;
	var birth = req.body.birth;
	var address = req.body.address;
	var email = req.body.email;
	var fb = req.body.fb;
	var fbid = req.body.fbid;
	var phone = req.body.phone;
	var income = req.body.income;
	var cookie = req.body.cookie;
	try {
		await mysql.addRecord('survey2', pnum, age, gender, ethnicity, name, birth, address, email, fb, fbid, phone, income, cookie)
	}
	catch (err) {
		console.log(err);
	}
})

routes.get('/test', async function(req, res) {
	try {
		var data = await mysql.getRecord('survey1', '123');
		console.log(data);
	}
	catch (err) {
		console.log(err);
	}
})	

module.exports = routes;