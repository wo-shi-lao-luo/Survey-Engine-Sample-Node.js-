const express = require('express');
const routes = express.Router();

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mysql = require('./mysql');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + '/public/uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, (Math.random().toString(36)+'00000000000000000').slice(2, 10) + Date.now() + '.mp3');
	}
})
const upload = multer({ storage: storage });
const findFile = (files, fieldname) => {
	return files.find(file => file.fieldname === fieldname) || {};
}

var index = fs.readFileSync(__dirname + '/pages/index.ejs', 'utf-8');
var survey = fs.readFileSync(__dirname + '/pages/survey.ejs', 'utf-8');
var questions1 = fs.readFileSync(__dirname + '/pages/questions1.ejs', 'utf-8');
var questions2 = fs.readFileSync(__dirname + '/pages/questions2.ejs', 'utf-8');
var questions3 = fs.readFileSync(__dirname + '/pages/questions3.ejs', 'utf-8');
var questions4 = fs.readFileSync(__dirname + '/pages/questions4.ejs', 'utf-8');
var cquestions = fs.readFileSync(__dirname + '/pages/common_questions.ejs', 'utf-8');
var recorderjs = fs.readFileSync(__dirname + '/pages/recorderjs.ejs', 'utf-8');
var test = fs.readFileSync(__dirname + '/pages/test.ejs', 'utf-8');
var admin = fs.readFileSync(__dirname + '/pages/admin.ejs', 'utf-8');
var record = fs.readFileSync(__dirname + '/pages/record.ejs', 'utf-8');
var condition = fs.readFileSync(__dirname + '/pages/condition.ejs', 'utf-8');
var detail1 = fs.readFileSync(__dirname + '/pages/detail1.ejs', 'utf-8');
var detail2 = fs.readFileSync(__dirname + '/pages/detail2.ejs', 'utf-8');
var delete_all = fs.readFileSync(__dirname + '/pages/delete_all.ejs', 'utf-8');

routes.get('/survey1', function(req, res) {
	var data = ejs.render(survey, {cquestions, questions: questions1});
	res.send(data);
});
routes.post('/survey1', upload.any(), async function(req,res) {
	var pnum = req.body.pnum;
	var age = req.body.age;
	var gender = req.body.gender;
	var ethn = req.body.ethn;
	var q1 = findFile(req.files, 'audio1').filename;
	var q2 = findFile(req.files, 'audio2').filename;
	var q3 = findFile(req.files, 'audio3').filename;
	var q4 = findFile(req.files, 'audio4').filename;
	var q5 = findFile(req.files, 'audio5').filename;
	var q6 = findFile(req.files, 'audio6').filename;
	var q7 = findFile(req.files, 'audio7').filename;
	var q8 = findFile(req.files, 'audio8').filename;
	var q9 = findFile(req.files, 'audio9').filename;
	try {
		await mysql.addRecord(pnum, 1, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9)
	}
	catch (err) {
		console.log(err);
	}
});

routes.get('/survey2', function(req, res) {
	var data = ejs.render(survey, {cquestions, questions:questions2});
	res.send(data);
});
routes.post('/survey2', upload.any(), async function(req,res) {
	var pnum = req.body.pnum;
	var age = req.body.age;
	var gender = req.body.gender;
	var ethn = req.body.ethn;
	var q1 = req.body.q1;
	var q2 = req.body.q2;
	var q3 = req.body.q3;
	var q4 = req.body.q4;
	var q5 = req.body.q5;
	var q6 = req.body.q6;
	var q7 = req.body.q7;
	var q8 = req.body.q8;
	var q9 = req.body.q9;
	try {
		await mysql.addRecord(pnum, 2, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9)
	}
	catch (err) {
		console.log(err);
	}
})

routes.get('/survey3', function(req, res) {
	var data = ejs.render(survey, {cquestions, questions: questions3});
	res.send(data);
});
routes.post('/survey3', upload.any(), async function(req,res) {
	var pnum = req.body.pnum;
	var age = req.body.age;
	var gender = req.body.gender;
	var ethn = req.body.ethn;
	var q1 = findFile(req.files, 'audio1').filename;
	var q2 = findFile(req.files, 'audio2').filename;
	var q3 = findFile(req.files, 'audio3').filename;
	var q4 = findFile(req.files, 'audio4').filename;
	var q5 = findFile(req.files, 'audio5').filename;
	var q6 = findFile(req.files, 'audio6').filename;
	var q7 = findFile(req.files, 'audio7').filename;
	var q8 = findFile(req.files, 'audio8').filename;
	var q9 = findFile(req.files, 'audio9').filename;
	try {
		await mysql.addRecord(pnum, 3, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9)
	}
	catch (err) {
		console.log(err);
	}
});

routes.get('/survey4', function(req, res) {
	var data = ejs.render(survey, {cquestions, questions:questions4});
	res.send(data);
});
routes.post('/survey4', upload.any(), async function(req,res) {
	var pnum = req.body.pnum;
	var age = req.body.age;
	var gender = req.body.gender;
	var ethn = req.body.ethn;
	var q1 = req.body.q1;
	var q2 = req.body.q2;
	var q3 = req.body.q3;
	var q4 = req.body.q4;
	var q5 = req.body.q5;
	var q6 = req.body.q6;
	var q7 = req.body.q7;
	var q8 = req.body.q8;
	var q9 = req.body.q9;
	try {
		await mysql.addRecord(pnum, 4, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9)
	}
	catch (err) {
		console.log(err);
	}
})

routes.get('/admin', function(req, res) {
	if (req.session.login) {
		res.redirect('/record');
		return;
	}
	res.send(ejs.render(admin));
})
routes.post('/admin', function(req, res) {
	// This is only for testing, recommend to use Hash and DB
	if (req.body.username === "test" && req.body.password === "testtest") {
		req.session.login = true;
		res.redirect('/record');
		return;
	}
	res.redirect('/admin');
	return;
})

routes.get('/record', async function(req, res) {
	if (!req.session.login) {
		res.redirect('/admin');
		return;
	}
	var records = await mysql.getAll();
	var data = ejs.render(record, {records: records});
	res.send(data);
})
routes.post('/record', function(req, res) {
	res.redirect('/condition?condition=' + req.body.pnum);
	return;
})

routes.get('/condition', async function(req,res) {
	if (!req.session.login) {
		res.redirect('/admin');
		return;
	}
	var cond = req.query.condition;
	var records = await mysql.getCondition(cond);
	var data = ejs.render(condition, {records: records});
	res.send(data);
})
routes.post('/condition', function(req, res) {
	res.redirect('/detail?pnum=' + req.body.pnum);
	return;
})

routes.get('/detail', async function(req, res) {
	if (!req.session.login) {
		res.redirect('/admin');
		return;
	}
	var pnum = req.query.pnum;
	var result = await mysql.getRecord(pnum);
	if (result[0].question == 1 || result[0].question == 3) {
		var data = ejs.render(detail1, {record: result});
	}
	else {
		var data = ejs.render(detail2, {record: result});
	}
	res.send(data);	
})

routes.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect('/admin');
	return;
})

routes.get('/delete_all', function(req, res) {
	if (!req.session.login) {
		res.redirect('/admin');
		return;
	}
	var data = ejs.render(delete_all);
	res.send(data);
})
routes.post('/delete_all', function(req, res) {
	if (req.body.delete === "delete") {
		mysql.deleteAll();
	}
	fs.readdir(__dirname + '/public/uploads', (err, files) => {
		if (err) throw err;
		for (const file of files) {
			fs.unlink(path.join(__dirname + '/public/uploads', file), err => {
				if (err) throw err;
			});
		}
	});
})

module.exports = routes;