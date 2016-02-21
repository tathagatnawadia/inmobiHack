var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/inmobi';

var aggregateUser=function(db,callback){
    db.collection('users').aggregate(
   [
         { $unwind : "$views" },
         {
         $group : {
            "_id" :"$views.articleId",
            "totalPrice" : {$sum:"$views.visibleTime"},
            "count": { $sum: 1 }
                 }
       }
    ]
 ).toArray(function (err, result) {
      assert.equal(err,null);
	console.log(result);
	callback(result);
    });
  };
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  aggregateUser(db, function() {
      db.close();
  });
});

