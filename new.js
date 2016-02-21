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
app.get('/anali', function (req,res) {
	res.send("WOka");
})

/*
Establishing Mongo Connection
*/

var dbHost = 'mongodb://localhost:27017/inmobi';
var usersCollection = 'users';
var articleCollection='articles';
var adsCollections = 'ads'


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

var intersection_destructive = function (a,b) {
	var result = new Array();
	while( a.length > 0 && b.length > 0 )
	{  
		 if      (a[0] < b[0] ){ a.shift(); }
		 else if (a[0] > b[0] ){ b.shift(); }
		 else /* they're equal */
		 {
			 result.push(a.shift());
			 b.shift();
		 }
	}

	return result.length;
}

var indexmail = function(db, callback) {
	db.collection(usersCollection).createIndex(
		{ "email": 1},{ unique:true},                                                            
		function(err,results) {
			callback();
		}
	);
};

var scrapeAds = function (db,callback) {
//	  db.collection('articles').find({"articleId":articleId},{"tags":1,"_id":0,"text":0,"url":0,"articleId":0}).toArray(function(err,result){
//		assert.equal(err,null);
//		console.log(result);
//		callback(result);
//	});

	var adStore;

	var cursor = db.collection(adsCollections).find();
	cursor.each(function (err,doc) {
		assert.equal(err, null);
		if(doc!=null){
			console.dir(doc);
		}else{
			callback();
		}
	});
};

//Array.prototype.removeValue = function(name, value){
//	var array = $.map(this, function(v,i){
//		return v[name] === value ? null : v;
//	});
//	this.length = 0; //clear original array
//	this.push.apply(this, array); //push all elements except the one we want to delete
//}

var jsonQuery = require('json-query')

var users = {
	people: []
}
io.on('connection', function(socket,db){
	/*
	Various event listeners for the app
	*/
	flag = 0;
	socket.on('signIn', function (obj) {
		var email = obj.email;
		var latitude = obj.latitude;
		var longitude = obj.longitude;
		var url = obj.url;
		util.log(email + " just connected !!");
		userSocket = jsonQuery('people[email='+email+'].socketId', {
				data: users
		});
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
		});
		
		
		//console.log(intersection_destructive(["train","below"], ["hat","train","smoke","joy"]));
	});
	
	socket.on('allElements', function (articleList) {
		email = articleList.email;
		getArticles = articleList.identifiers;
		for(var article in getArticles){
			//console.log(getArticles[article]);
		}
		userSocket = jsonQuery('people[email='+email+'].socketId', {
				data: users
		});
		io.sockets.connected[userSocket.value].emit("allElementsResponse",getArticles);
	});
	/*
	So receving unknown articles from the webpage
	*/
	
	socket.on('divContent',function (listOfArticles) {
		articles = listOfArticles.content;
		var temp = []
		var pivot;
       	for(var article in articles){
              var tags = keyword_extractor.extract(articles[article].content,{
                            language:"english",
                            remove_digits: true,
                            return_changed_case:true,
                            remove_duplicates: true
              });
              var wc = wordcount(articles[article].content);
              var now = {
                  articleId : articles[article].articleId,
                  text : articles[article].content,
                  tags 	  : tags,
                  wordcount : wc,
				   url : listOfArticles.url
              };
			  temp.push(now);
			  pivot = now.articleId;
         }
		MongoClient.connect(dbHost, function (err,db) {
			db.collection(articleCollection).find({'articleId' : pivot}).toArray(function(err,result){
				if(err)
				console.log(err);
				else if(result.length>0 && result)
				console.log("duplicate found ");
				else
				db.collection(articleCollection).insert(temp);
			});
		});
	});
	/*
	Screen time for the div
	*/
	socket.on("screenChange", function (message) {
		url = message.url;
		email = message.email;
		articleId = message.identifier;
		visibleTime = parseInt(message.visibleTime);
		var now = {
			articleId : articleId,
			visibleTime : visibleTime,
			time : new Date()
		}
		MongoClient.connect(dbHost, function (err,db) {
			db.collection(usersCollection).update({'email' : email}, { $push: { "views" : now }});
		});
		
		if(visibleTime > 5000){
			userSocket = jsonQuery('people[email='+email+'].socketId', {
								data: users
			});
			
			MongoClient.connect(dbHost,function(err,db){
				assert.equal(null,err);
				scrapeAds(db,function () {
					db.close();
				});
			});
			
			
			var pushSchemaObject = {
							'type'  : 'image',
							'title' : 'Preorder Hell In the way',
							'provider' : 'Linkin Park',
							'imgUrl' : 'http://www.planwallpaper.com/static/images/Winter-Tiger-Wild-Cat-Images.jpg',
							'description' : 'Order Linkin Park new album now to get additional 2 bonus songs.',
							'link' : 'www.google.com'
			}
			io.sockets.connected[userSocket.value].emit("adPush", pushSchemaObject);
		}
	});
	
	/*
	User closes an app
	*/
	socket.on('disconnect', function(){
		userSocket = jsonQuery('people[socketId='+socket.id+'].email', {
				data: users
		});
		//users.people.removeValue('socketId', socket.id);
		util.log(userSocket.value+'user disconnected');
		console.log(users);
	});
	
//	if(flag == 0){
//		userSocket = jsonQuery('people[email='+email+'].socketId', {
//				data: users
//		}); 
//		var pushSchemaObject = {
//			'type'  : 'ad',
//			'title' : 'Preorder Hell In the way',
//			'provider' : 'Linkin Park',
//			'url' : 'htttp://www.youtube.com/LP',
//			'description' : 'Order Linkin Park new album now to get additional 2 bonus songs.'
//		}
//		io.sockets.connected[userSocket.value].emit("adpush", pushSchemaObject);
//	}
	
	
});

server.listen(3000, function(){
	console.log('News Digest Starting on *:3000');
});



