var MongoClient = require("mongodb").MongoClient; //AIM 1
var assert = require("assert"); //AIM 1
var format = require("util").format;


//-------------------------------------------------------------------------------------------------------------------------------------
// AIM 1 : Establish a mongo connection using $npm install mongodb
//-------------------------------------------------------------------------------------------------------------------------------------

/*
//$npm install mongodb (Acts as driver between mongo and node for CRUD operation on the database)

//In terminal 1: $mongod --dbpath ./data/db
//In terminal 2: $mongo
//In browser   : http://localhost:27017/ 

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server.");
	db.close();
});
*/

//************************************************************************************************************************************


//-------------------------------------------------------------------------------------------------------------------------------------
// AIM 2 : Inserting and Retrieving a collection
//-------------------------------------------------------------------------------------------------------------------------------------

var url = 'mongodb://localhost:27017/inmobi';
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server.");
	
	var collection = db.collection('ads');
	
	
	
	
	
	
	var ad = {
		"type" : "video",
 		"title" : "Fantasy Basketball online challenge",
		"description" : "This is a fantasy league",
		"link" : "http://nba.com/fantasy",
		"tags" : ["fantasy","basketball"],
		"imgUrl" : '<iframe width="450" height="350px" src="https://www.youtube.com/embed/in_mIr2fah4?autoplay=1" frameborder="0" allowfullscreen></iframe>'
	};
	var ad1 = {
		"type" : "image",
 		"title" : "Rules and regulations",
		"description" : "This is rules and regulations",
		"link" : "http://www.nba.com/news/officiating",
		"tags" : ["rules","regulations"],
		"imgUrl" : "http://basketball.isport.com/userfiles/image/Basketball_PersonalFoulExplained_1.jpg"
	};
	var ad2 = {
		"type" : "video",
 		"title" : "golf tour challenge",
		"description" : "This is the golf tour",
		"link" : "http://www.indiagolftours.com/",
		"tags" : ["golf","tour"],
		"imgUrl" : '<iframe width="450" height="350px" src="https://www.youtube.com/embed/eDkNjcIoOcw" frameborder="0" allowfullscreen?autoplay=1></iframe>'
	};
	var ad3 = {
		"type" : "image",
 		"title" : "golf course",
		"description" : "This is a golf course",
		"link" : "http://www.kga.in/",
		"tags" : ["golf","course"],
		"imgUrl" : "http://theaposition.com/robertfagan/wp-content/uploads/sites/33/2012/08/3Golf-Club.jpg"
	};
	var ad4 = {
		"type" : "video",
 		"title" : "golf equipment",
		"description" : "These are golf equipments",
		"link" : "http://www.rockbottomgolf.com/",
		"tags" : ["golf","equipment"],
		"imgUrl" : '<iframe width="450" height="350px" src="https://www.youtube.com/embed/oWcmC4W7zM4?autoplay=1" frameborder="0" allowfullscreen></iframe>'
	};
	var ad5 = {
		"type" : "video",
 		"title" : "Nexus 5",
		"description" : "The best nexus ever made",
		"link" : "http://www.gsmarena.com/lg_nexus_5-5705.php",
		"tags" : ["Nexus","5"],
		"imgUrl" : '<iframe width="450" height="350px" src="https://www.youtube.com/embed/1dg2UIzIt4s?autoplay=1" frameborder="0" allowfullscreen></iframe>'
	};
	var ad6 = {
		"type" : "image",
 		"title" : "Nexus 6",
		"description" : "The biggest nexus ever made",
		"link" : "http://www.gsmarena.com/motorola_nexus_6-6604.php",
		"tags" : ["Nexus","6"],
		"imgUrl" : "http://www.androidpolice.com/wp-content/uploads/2014/09/nexus2cee_n6lf3.png"
	};
	var ad7 = {
		"type" : "image",
 		"title" : "Sonam Kapoor ",
		"description" : "Sonam Kapoor recent news ",
		"link" : "https://en.wikipedia.org/wiki/Sonam_Kapoor",
		"tags" : ["Sonam","Kapoor"],
		"imgUrl" : "http://images.indianexpress.com/2015/12/sonamkapoor-neerja759.jpg"
	}
	var ad8 = {
		"type" : "image",
 		"title" : "Redmi 1S",
		"description" : "A budgeted phone available in India",
		"link" : "http://www.gsmarena.com/xiaomi_redmi_1s-6373.php",
		"tags" : ["Redmi","1S"],
		"imgUrl" : "http://drop.ndtv.com/TECH/product_database/images/7162014112543AM_635_xiaomi_redmi_1s.jpeg"
	};
		var ad8 = {
		"type" : "video",
 		"title" : "Xiaomi",
		"description" : "One of the worlds best startups from China",
		"link" : "http://www.mi.com/in",
		"tags" : ["Xiaomi"],
		"imgUrl" : '<iframe width="450" height="350px" src="https://www.youtube.com/embed/-M01W6_loPU?autoplay=1" frameborder="0" allowfullscreen></iframe>'
	};
	var ad8 = {
		"type" : "video",
 		"title" : "Preity Zinta",
		"description" : "Preity Zinta is a bollywood actress",
		"link" : "https://en.wikipedia.org/wiki/Preity_Zinta",
		"tags" : ["Preity","Zinta"],
		"imgUrl" : '<iframe width="450" height="350px" src="https://www.youtube.com/embed/zDIyARgNCo0?autoplay=1" frameborder="0" allowfullscreen></iframe>'
	}
	
	//INSERTION in MONGO COLLECTION 
	collection.insert(ad, {w: 1}, function(err, records){
		console.log("Record added !!"+records);
	});
	
	collection.insert(ad1, {w: 1}, function(err, records){
		console.log("Record added !!"+records);
	});	
	
	collection.insert(ad2, {w: 1}, function(err, records){
		console.log("Record added !!"+records);
	});	
	
	collection.insert(ad3, {w: 1}, function(err, records){
		console.log("Record added !!"+records);
	});	
	
	collection.insert(ad4, {w: 1}, function(err, records){
		console.log("Record added !!"+records);
	});	
	
	collection.insert(ad5, {w: 1}, function(err, records){
		console.log("Record added !!"+records);
	});	
	
	collection.insert(ad6, {w: 1}, function(err, records){
		console.log("Record added !!"+records);
	});	
	
	collection.insert(ad7, {w: 1}, function(err, records){
		console.log("Record added !!"+records);
	});	
	
	collection.insert(ad8, {w: 1}, function(err, records){
		console.log("Record added !!"+records);
	});	
	
	//RETRIVAL in MONGO COLLECTION
	var cursor = collection.find(); //Its just like a select * from students collection
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		}
	});
	
});


//************************************************************************************************************************************




