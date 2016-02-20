var express = require("express"); 
var http = require("http");
var util = require("util");
var MongoClient = require("mongodb").MongoClient; 
var assert = require("assert");

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));

/*
Running Python Script Tagger from here
*/
var PythonShell = require('python-shell');

var options = {
	args: ['Tathagat is so bored here that he ordered pizza from Dominoes.']
};

PythonShell.run('taggers/tagger.py', options,function (err, results) {
	if (err) throw err;
	// results is an array consisting of messages collected during execution 
	console.log('results: %j', results);
});

io.on('connection', function(socket){
	/*
	Various event listeners for the app
	*/
	
	socket.on('signIn', function (obj) {
		var email = obj.email;
		var lat = obj.latitude;
		var long = obj.longitude;
		util.log(email + " just connected !!");
	});
	
	socket.on('articleOpen', function(obj){
		util.log(obj)
	});
	
	socket.on('articleClose', function(obj){
		util.log(obj)
	});
	
	socket.on('headLines', function(obj){
		util.log(obj);
	});
	
	
	socket.on('article click off', function (email) {
		
	})
	
	socket.on('hover', function (email,article_text) {
		
	});
	
	socket.on('disconnect', function(){
		util.log('user disconnected');
	});
	
});
server.listen(3000, function(){
	console.log('News Digest Starting on *:3000');
});



