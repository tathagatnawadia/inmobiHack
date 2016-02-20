var express = require("express"); //AIM 1
var http = require("http"); //AIM 2
var util = require("util"); //AIM 3




//-------------------------------------------------------------------------------------------------------------------------------------
// AIM 1 : Prepare a http server with express
//-------------------------------------------------------------------------------------------------------------------------------------

/*
//Difference between polling and sockets
var app = express();
var server = http.createServer(app);

//Static files middleware
app.use(express.static("./public"));

server.listen(3000);
*/

//************************************************************************************************************************************




//-------------------------------------------------------------------------------------------------------------------------------------
// AIM 2 : Install the socket.io npm module and make basic chat app
//-------------------------------------------------------------------------------------------------------------------------------------

/*
//$npm install socket.io --save
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});
server.listen(3000, function(){
	console.log('listening on *:3000');
});
*/


//************************************************************************************************************************************


//-------------------------------------------------------------------------------------------------------------------------------------
// AIM 3 : Adding a few things to the app
//-------------------------------------------------------------------------------------------------------------------------------------

/*
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));

io.on('connection', function(socket){
	socket.on('introduce', function (name) {
		util.log(name + " just connected !!");
	});
	socket.on('chat message', function(name,msg){
		util.log('Tracing :: '+ name + " :: " + msg);
		io.emit('chat message',name,msg);
	});
	socket.on('creepy', function (name,msg) {
		util.log('Creeping :: '+ name + " :: " + msg);
	})
	socket.on('disconnect', function(){
		util.log('user disconnected');
	});
});
server.listen(3000, function(){
	console.log('listening on *:3000');
});
*/

//************************************************************************************************************************************


