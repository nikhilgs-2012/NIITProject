
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
//router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var AvtcSchema = mongoose.Schema({
    avtcCity: String,
    avtcTheatreName: String,
    avtcDate: String,
    avtcShowTime: String,
    avtcAvailableTickets: String,
    avtcMovieName: String
 });

var Avtc = mongoose.model('Avtc', AvtcSchema, 'availableTickets');

//Master
  router.get('/getAvtc', function (req, res) {
    console.log("REACHED avtc GET FUNCTION ON SERVER");
    Avtc.find({}, function (err, docs) {
         res.json(docs);         
    });
});

  router.get('/getAvtc/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     Avtc.find({avtcBookingId: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addAvtc', function(req, res){
  console.log(req.body);
  
  var avtcCity = req.body.bktcCity;
  var avtcTheatreName = req.body.bktcTheatreName;
  var avtcDate = req.body.bktcDate;
  var avtcShowTime = req.body.bktcShowTime;
  var avtcAvailableTickets = req.body.bktcAvailableTickets;
  var avtcMovieName = req.body.bktcMovieName;

  var avtc = new Avtc({
    avtcCity,
    avtcTheatreName,
    avtcDate,
    avtcShowTime,
    avtcAvailableTickets,
    avtcMovieName
  });

  avtc.save(function(err, docs){
    if ( err ) throw err;
    console.log("available Tickets Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteAvtc/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      Avtc.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateAvtc/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    
    Avtc.update({_id: req.params.id}, {
            avtcAvailableTickets : req.body.avtcAvailableTickets
        }, 
        function(err, affected, resp) {
           res.json(resp);
        }
  )
})

  module.exports = router;