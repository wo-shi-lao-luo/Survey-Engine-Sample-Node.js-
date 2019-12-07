``````

Server is based on Node.js, using ejs template.
HTML5 is required for full functions of the website.

Other Requirements:
	SSL will be needed to support HTTPS request for web server.
	HTTPS is required to capture audios from users


``````

Recording function uses getUserMedia functions by frontend JavaScript.
Please check /public/js/recorder.js
// Chrome requires server start recording after user make gesture (click, type, etc.). So be careful when editing the recorder.js file. Make sure recording request be triggered after onclick() function is triggered. 


``````
Backend settings and packages:

Required Packages: 
	$ npm install ejs						(page render)
	$ npm install express					(server build)
	$ npm install --save body-parser		(page content parse)
	$ npm install multer					(file upload)
	$ npm install -g nodemon				(real time monitor)
	$ npm install -save mysql				(database API)
	$ npm install express-session			(login status authentication)
	$ npm install path						(support to delete local uploaded audio files)
Settings:
	package.json							(npm settings)
Start:
	$ node app.js 							(start local server)

Monitor:
	Config:
		$ npm install -g nodemon			
	To start:
		$ nodemon							(start local server with monitor)
		
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


``````

AWS Service:
	EC2									(Linux Virtual Machine)
	CloudFront							(HTTPS setting, also increase server response performance)
	Route53								(SSL certificate, DNS setting)

Linux Virtual Machine config:
	Set output port to 80: 				(original port is 3000)
		$sudo iptables -t nat -A PREROUTING -p tcp --dport 80 REDIRECT --to-ports 3000

Google Service:
	Google Domains						(Domain name)
``````
