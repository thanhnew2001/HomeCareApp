// var MongoClient = require('mongodb').MongoClient;
// const url = "mongodb+srv://thanh:thanh@cluster0.ntvke.mongodb.net/mydb?retryWrites=true&w=majority";

// var option = {
//   db:{
//     numberOfRetries : 5
//   },
//   server: {
//     auto_reconnect: true,
//     poolSize : 40,
//     socketOptions: {
//         connectTimeoutMS: 500
//     }
//   },
//   replSet: {},
//   mongos: {}
// };

// function MongoPool(){}

// var p_db;

// function initPool(cb){
//   MongoClient.connect(url, option, function(err, db) {
//     if (err) throw err;

//     p_db = db;
//     if(cb && typeof(cb) == 'function')
//         cb(p_db);
//   });
//   return MongoPool;
// }



// MongoPool.initPool = initPool;

// function getInstance(cb){
//   if(!p_db){
//     initPool(cb)
//   }
//   else{
//     if(cb && typeof(cb) == 'function')
//       cb(p_db);
//   }
// }
// MongoPool.getInstance = getInstance;

// module.exports = MongoPool;