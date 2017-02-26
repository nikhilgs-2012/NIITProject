
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
//router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');


// var dbHost = 'mongodb://localhost:27017/test';
// mongoose.connect(dbHost);



var stimSchema = mongoose.Schema({
   
    stimName: String
 });
var Stim = mongoose.model('Stim', stimSchema, 'stim');



//Master
  router.get('/getStim', function (req, res) {
    console.log("REACHED stim GET FUNCTION ON SERVER");
    Stim.find({}, function (err, docs) {
         res.json(docs);         
    });
});

  router.get('/getStim/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     Stim.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addStim', function(req, res){
  console.log(req.body);
  
  var name = req.body.stimName;
  var stim = new Stim({
   
    stimName:name   
  });

  stim.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteStim/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      Stim.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateStim/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Stim.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

module.exports = router;