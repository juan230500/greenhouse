var express = require('express');
var router = express.Router();
var constants = require('../constants');

var MongoClient = require('mongodb').MongoClient;
const client = MongoClient('mongodb://localhost:27017/',{ useUnifiedTopology: true })

let mydb = null;

client.connect(function(err, db) {
  if (err) {
    throw err;
  }
  mydb = db.db("mydb");
});

const getDate = (req,res,next) => {
  var date = new Date;
  req.requestTime =
  `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`+
  ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  next();
}

router.use(getDate);

/* GET users listing. */
router.get('/', (req, res, next) => {
  if (req.headers.authorization != constants.APIkey)
    res.json({result:'access denied'});
  else{
    mydb.collection("data").find({}).toArray((err,result)=>{
      //console.log(result);
      res.json({result:result})
    });
  }
  
});

router.post('/',(req,res)=>{
  if (req.headers.authorization != constants.APIkey){
    res.json({result:'access denied'});
  }
  else{
    let newData = req.body;
    newData.date = req.requestTime;
    mydb.collection("data").insertOne(newData, (err) => {
      if (err) {
        res.json({error:err});
        throw err;
      };
      res.json({result:newData})
    });
  }
})

module.exports = router;

