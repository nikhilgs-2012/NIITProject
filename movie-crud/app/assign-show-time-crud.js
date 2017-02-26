
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
//router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');


// var dbHost = 'mongodb://localhost:27017/test';
// mongoose.connect(dbHost);



var AsstSchema = mongoose.Schema({
   asstTheatre:String,
    asstTime: String
 });

var Asst = mongoose.model('Asst', AsstSchema, 'assignShowTime');


//Master
  router.get('/getAsst', function (req, res) {
    console.log("REACHED asst GET FUNCTION ON SERVER");
    Asst.find({}, function (err, docs) {
         res.json(docs);         
    });
});

  router.get('/getAsst/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     Asst.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addAsst', function(req, res){
  console.log(req.body);
  
  var asstTime = req.body.asstTime;
  var asstTheatre = req.body.asstTheatre;
  var asst = new Asst({
    asstTheatre,
    asstTime  
  });

  asst.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteAsst/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      Asst.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateAsst/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Asst.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

  module.exports = router;