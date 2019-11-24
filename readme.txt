This template was made by Colorlib (https://colorlib.com)
Please visit our website for more awesome templates, themes and tools. 

``````

Server is based on Node.js, using ejs template.
HTML5 is required for full functions of the website.

``````

Recording function uses getUserMedia functions by frontend JavaScript.
Please check /public/js/recorder.js


``````

Config: 
	$ npm install ejs
Start:
	$ node app.js

Express:
	Config:
		$ npm install -g nodemon
		$ npm install express
		$ npm install --save body-parser
		$ npm install multer
	To start:
		$ nodemon
	File:
		nodemon.js
	App.js config:
		
``````

Database config:
	install:
		$ npm install -save mysql

CREATE DATABASE surveyengine;

CREATE TABLE survey (
	pnum VARCHAR(255) NOT NULL,
	question INTEGER NOT NULL,
	age VARCHAR(255),
	gender VARCHAR(255),
	ethn VARCHAR(255),
	q1 VARCHAR(255),
	q2 VARCHAR(255),
	q3 VARCHAR(255),
	q4 VARCHAR(255),
	q5 VARCHAR(255),
	q6 VARCHAR(255),
	q7 VARCHAR(255),
	q8 VARCHAR(255),
	q9 VARCHAR(255),
	PRIMARY KEY (pnum))