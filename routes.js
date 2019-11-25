const routes = require('express').Router();

const fs = require('fs');
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
var survey1 = fs.readFileSync(__dirname + '/pages/survey1.ejs', 'utf-8');
var survey2 = fs.readFileSync(__dirname + '/pages/survey2.ejs', 'utf-8');
var questions1 = fs.readFileSync(__dirname + '/pages/questions1.ejs', 'utf-8');
var questions2 = fs.readFileSync(__dirname + '/pages/questions2.ejs', 'utf-8');
var cquestions = fs.readFileSync(__dirname + '/pages/common_questions.ejs', 'utf-8');
var recorderjs = fs.readFileSync(__dirname + '/pages/recorderjs.ejs', 'utf-8');
// var top = fs.readFileSync(__dirname + '/pages/top.ejs', 'utf-8');
var test = fs.readFileSync(__dirname + '/pages/test.ejs', 'utf-8');


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
	res.header('Cache-Control','max-age=0');
	var data = ejs.render(survey2, {cquestions, questions2});
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

routes.get('/test', async function(req, res) {
	// res.send(fs.readFileSync(__dirname + '/pages/test.ejs', 'utf-8'))
	// audio = fs.createReadStream(__dirname + "/uploads/0ec21825fffef8805f8586f3eed5c7eb");
	// console.log(audio);
	// var data = ejs.render(test, audio);
	var data = ejs.render(test);
	res.send(data);
});
// routes.post('/test', async function(req, res) {
	
// });

module.exports = routes;