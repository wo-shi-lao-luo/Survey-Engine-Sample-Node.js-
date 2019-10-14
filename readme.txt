This template was made by Colorlib (https://colorlib.com)
Please visit our website for more awesome templates, themes and tools. 

``````

Server is based on Node.js, using ejs template.
HTML5 is required for full functions of the website.

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

CREATE DATABASE QAengine;

CREATE TABLE users (
	user_id INTEGER AUTO_INCREMENT NOT NULL,
	username VARCHAR(255) NOT NULL UNIQUE,
   	password VARCHAR(255) NOT NULL,
   	email VARCHAR(255) NOT NULL UNIQUE,
	admin BIT,
   	PRIMARY KEY (user_id))