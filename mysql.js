const mysql = require('mysql');

// Info for real db is deleted
const pool = mysql.createPool({
	connectionLimit: 100,
	host: "localhost",
	user: "root",
	password: "",
	database: "surveyengine"
});

async function addRecord(pnum, question, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9) {
	return new Promise(async (resolve, reject) => {
		let sql = "INSERT INTO survey (pnum, question, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9) VALUES ?";
		let values = [[pnum, question, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9]];
		pool.query(sql, [values], function (err, result) {
		    if (err) return reject(err);
		    console.log("New record inserted");
		})
	})
}

function getRecord(pnum) {
	return new Promise((resolve, reject) => {
		var sql = "SELECT * FROM survey WHERE pnum = ?";
		var values = [[pnum]];
		pool.query(sql, [values], function (err, result) {
		    if (err) return reject(err);
		    console.log("Got record");
		    return resolve(result);
		})
	})
}

function getAll() {
	return new Promise((resolve, reject) => {
		var sql = "SELECT question, COUNT(question) as count FROM survey GROUP BY question";
		pool.query(sql, function (err, result) {
			if (err) return reject(err);
		    console.log("Got all record");
		    return resolve(result);
		})
	})
}

function getCondition(condition) {
	return new Promise((resolve, reject) => {
		var sql = "SELECT * FROM survey WHERE question = ?";
		var values = [[condition]];
		pool.query(sql, [values], function (err, result) {
			if (err) return reject(err);
		    console.log("Got all record");
		    return resolve(result);
		})
	})
}

function deleteAll() {
	pool.query("SET SQL_SAFE_UPDATES = 0;" , function (err, result) {
		if (err) console.log(err);
	    console.log("SET SQL_SAFE_UPDATES = 0");
	    console.log(result);
	})
	pool.query("DELETE FROM survey;" , function (err, result) {
		if (err) console.log(err);
	    console.log("All records deleted");
	    console.log(result);
	})
}

module.exports = {
	mysql,
	addRecord,
	getRecord,
	getAll,
	getCondition,
	deleteAll
}