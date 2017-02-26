
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
//router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var TheatreSchema = mongoose.Schema({
   
    thtrName: String,
    totalSeat: String,
    ticketPrice: String,
    city: String
 });
var Theatre = mongoose.model('Theatre', TheatreSchema, 'theatre');



//Master
  router.get('/getThtr', function (req, res) {
    console.log("REACHED theatre GET FUNCTION ON SERVER");
    Theatre.find({}, function (err, docs) {
         res.json(docs);         
    });
});

  router.get('/getThtr/:id', function (req, res) {
    console.log("REACHED theatre GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     Theatre.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addThtr', function(req, res){
  console.log(req.body);
 
  var theatreName = req.body.thtrName;
  var totalSeat = req.body.totalSeat;
  var ticketPrice = req.body.ticketPrice;
  var cityName = req.body.city;

  var theatre = new Theatre({
   
    thtrName:theatreName,
    totalSeat: totalSeat,
    city: cityName,
    ticketPrice: ticketPrice   
  });

console.log(theatre);
  theatre.save(function(err, docs){
    if ( err ) throw err;
    console.log("Theatre Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteThtr/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      Theatre.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateThtr/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Theatre.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

module.exports = router;