var express = require("express"); 
var http = require("http");
var util = require("util");
var MongoClient = require("mongodb").MongoClient; 
var assert = require("assert");
var objectId = require("mongodb").ObjectID
var jsonQuery = require('json-query')
var keyword_extractor = require("keyword-extractor");
var PythonShell = require('python-shell');
var wordcount = require('wordcount');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));

/*
Establishing Mongo Connection
*/

var dbHost = 'mongodb://localhost:27017/inmobi';
var usersCollection = 'users';
var articleCollection='articles'


/*
Running Python Script Tagger from here
*/

var generateTags = function (text){
	var tags = "";
	var options = {
		args: [text]
	};
	
	var pyshell = new PythonShell('taggers/tagger.py', options)
	
	pyshell.on("message", function (message) {
		return message
	})
}

var indexmail = function(db, callback) {
	db.collection(usersCollection).createIndex(
		{ "email": 1},{ unique:true},                                                            
		function(err,results) {
			callback();
		}
	);
};

var jsonQuery = require('json-query')
 
var users = {
	people: []
}
io.on('connection', function(socket,db){
	/*
	Various event listeners for the app
	*/
	socket.on('signIn', function (obj) {
		var email = obj.email;
		var latitude = obj.latitude;
		var longitude = obj.longitude;
		var url = obj.url;
		util.log(email + " just connected !!");
		userSocket = jsonQuery('people[email='+email+'].socketId', {
				data: users
		})
		users.people.push({ email : email , socketId : socket.id});
		//Add code for inserting or updating user
		MongoClient.connect(dbHost, function (err,db) {
				db.collection(usersCollection).insert({'email':email,'latitude':latitude,'longitude':longitude});
				indexmail(db, function() {
					assert.equal(null, err);
				});
		});
		/*
		Query the socket of the connected User based on emailID
		*/
		userSocket = jsonQuery('people[email='+email+'].socketId', {
				data: users
		})
		io.sockets.connected[userSocket.value].emit("adpush", "Ad 1");
	});
	
	socket.on('allElements', function (articleList) {
		email = articleList.email;
		getArticles = articleList.identifiers;
		for(var article in getArticles){
			console.log(getArticles[article]);
		}
		userSocket = jsonQuery('people[email='+email+'].socketId', {
				data: users
		})
		io.sockets.connected[userSocket.value].emit("allElementsResponse",getArticles);
	});
	/*
	So receving unknown articles from the webpage
	*/
	
	socket.on('divContent',function (listOfArticles) {
		articles = listOfArticles.content
		console.log("This is a rockstar framework");
			MongoClient.connect(dbHost, function (err,db) {
		for(var article in articles){
			
			//var extraction_result = generateTags(articles[article].content)
			var tags = keyword_extractor.extract(articles[article].content,{
											language:"english",
											remove_digits: true,
											return_changed_case:true,
											remove_duplicates: true
			});
			var wc = wordcount(articles[article].content);
			now = {
				articleId : articles[article].articleId,
				text : articles[article].content,
				tags 	  : tags,
				wordcount : wc
			};
			
			/*
			Inserting article in the collection if its not present
			*/
		
					db.collection(articleCollection).find({'articleId' : now.articleId}).toArray(function (err,result) {
						console.log(now);
						if(err)
							console.log(err);
						else if(result.length > 0 && result){
							console.log("Article already exists");
						}
						else{
							db.collection(articleCollection).insert({'articleId': now.articleId, 'text':now.text, 'tags':now.tags, 'wordcount':now.wordcount },function (err) {
		console.log("done something");						
							});
						}
					});
				
			}
			});
		
	});
	/*
	Screen time for the div
	*/
	socket.on("screenChange", function (message) {
		url = message.url;
		email = message.email;
		articleId = message.identifier;
		visibleTime = message.visibleTime;
		console.log(message);
	})
	
	/*
	User closes an app
	*/
	socket.on('disconnect', function(){
		util.log('user disconnected');
	});
	
});

server.listen(3000, function(){
	console.log('News Digest Starting on *:3000');
});



