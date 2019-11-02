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

CREATE TABLE survey1 (
	pnum VARCHAR(255) NOT NULL,
	age INTEGER,
	gender VARCHAR(255),
	ethnicity VARCHAR(255),
	name VARCHAR(255),
	birth VARCHAR(255),
	address VARCHAR(255),
	email VARCHAR(255),
	fb VARCHAR(255),
	fbid VARCHAR(255),
	phone VARCHAR(255),
	income VARCHAR(255),
	cookie VARCHAR(255),
	PRIMARY KEY (pnum))