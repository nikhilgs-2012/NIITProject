
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
//router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var BktcSchema = mongoose.Schema({
    bktcCity: String,
    bktcUserName: String,
    bktcTheatreName: String,
    bktcDate: String,
    bktcShowTime: String,
    bktcBookedTickets: String,
    bktcAvailableTickets: String,
    bktcBookingId: String,
    bktcBookedAmount: String,
    bktcMovieName: String
 });

var Bktc = mongoose.model('bktc', BktcSchema, 'bookTickets');

//Master
  router.get('/getBktc', function (req, res) {
    console.log("REACHED bktc GET FUNCTION ON SERVER");
    Bktc.find({}, function (err, docs) {
         res.json(docs);         
    });
});

  router.get('/getBktc/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     Bktc.find({bktcBookingId: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addBktc', function(req, res){
  console.log(req.body);
  
  var bktcCity = req.body.bktcCity;
  var bktcUserName = req.body.bktcUserName;
  var bktcTheatreName = req.body.bktcTheatreName;
  var bktcDate = req.body.bktcDate;
  var bktcShowTime = req.body.bktcShowTime;
  var bktcBookedTickets = req.body.bktcBookedTickets;
  var bktcAvailableTickets = req.body.bktcAvailableTickets;
  var bktcBookingId = req.body.bktcBookingId;
  var bktcBookedAmount = req.body.bktcBookedAmount;
  var bktcMovieName = req.body.bktcMovieName;

  var bktc = new Bktc({
    bktcCity,
    bktcUserName,
    bktcTheatreName,
    bktcDate,
    bktcShowTime,
    bktcBookedTickets,
    bktcAvailableTickets,
    bktcBookingId,
    bktcBookedAmount,
    bktcMovieName
  });

  bktc.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteBktc/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      Bktc.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateBktc/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Bktc.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})


module.exports = router;