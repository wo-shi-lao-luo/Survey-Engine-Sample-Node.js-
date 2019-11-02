const mysql = require('mysql');

const pool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: "root",
	password: "",
	database: "surveyengine"
});

async function addRecord(table, pnum, age, gender, ethnicity, name, birth, address, email, fb, fbid, phone, income, cookie) {
	return new Promise(async (resolve, reject) => {
		if (ethnicity[0] !== "OT") {
			ethnicity = ethnicity[0];
		}
		else {
			ethnicity = ethnicity[1];
		}
		let record = await getRecord(table, pnum);
		if (record.length < 1) {
			let sql = "INSERT INTO " + table + " (pnum, age, gender, ethnicity, name, birth, address, email, fb, fbid, phone, income, cookie) VALUES ?";
			let values = [[pnum, age, gender, ethnicity, name, birth, address, email, fb, fbid, phone, income, cookie]];
			pool.query(sql, [values], function (err, result) {
			    if (err) return reject(err);
			    console.log(result);
			    console.log("New record inserted");
			})
		}
		else {
			let sql = "UPDATE " + table + " SET ? WHERE pnum = " + pnum;
			let values = {age, gender, ethnicity, name, birth, address, email, fb, fbid, phone, income, cookie};
			pool.query(sql, [values], function (err, result) {
			    if (err) return reject(err);
			    console.log(result);
			    console.log("Record updated");
			})
		}
	
	})
}

function getRecord(table, pnum) {
	return new Promise( (resolve, reject) => {
		var sql = "SELECT * FROM " + table + " WHERE pnum = ?";
		var values = [[pnum]];
		pool.query(sql, [values], function (err, result) {
		    if (err) return reject(err);
		    console.log("Got record");
		    return resolve(result);
		})
	})
}

module.exports = {
	mysql,
	addRecord,
	getRecord
}