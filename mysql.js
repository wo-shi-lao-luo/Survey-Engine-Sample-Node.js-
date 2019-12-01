const mysql = require('mysql');

const pool = mysql.createPool({
	connectionLimit: 100,
	host: "surveydb.covbsd7hypl1.us-east-1.rds.amazonaws.com",
	user: "root",
	password: "gwumarketing",
	database: "surveyengine"
	// connectionLimit: 100,
	// host: "localhost",
	// user: "root",
	// password: "",
	// database: "surveyengine"
});

async function addRecord(pnum, question, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9) {
	return new Promise(async (resolve, reject) => {
		let record = await getRecord(pnum);
		if (record.length < 1) {
			let sql = "INSERT INTO survey (pnum, question, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9) VALUES ?";
			let values = [[pnum, question, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9]];
			pool.query(sql, [values], function (err, result) {
			    if (err) return reject(err);
			    console.log("New record inserted");
			})
		}
		else {
			let sql = "UPDATE survey SET ? WHERE pnum = " + "'" + pnum + "'";
			let values = {question, age, gender, ethn, q1, q2, q3, q4, q5, q6, q7, q8, q9};
			pool.query(sql, [values], function (err, result) {
			    if (err) return reject(err);
			    console.log("Record updated");
			})
		}
	
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
		var sql = "SELECT * FROM survey";
		pool.query(sql, function (err, result) {
			if (err) return reject(err);
		    console.log("Got all record");
		    return resolve(result);
		})
	})
}

module.exports = {
	mysql,
	addRecord,
	getRecord,
	getAll
}