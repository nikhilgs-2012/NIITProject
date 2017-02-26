
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
//router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var AssignMovieSchema = mongoose.Schema({
  
    asmvMovie: String,
    asmvCity: String,
    asmvTheatre: String,
    asmvFromDate: String,
    asmvToDate: String,
 });
var AssignMovie = mongoose.model('AssignMovie', AssignMovieSchema, 'assignmovie');



//Master
  router.get('/getAsmv', function (req, res) {
    console.log("REACHED ASMV GET FUNCTION ON SERVER");
    AssignMovie.find({}, function (err, docs) {
         res.json(docs);         
    });
});

  router.get('/getAsmv/:id', function (req, res) {
    console.log("REACHED asmv GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     AssignMovie.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addAsmv', function(req, res){
  console.log(req.body);
 
  var asmvMovie = req.body.asmvMovie;
  var asmvCity = req.body.asmvCity;
  var asmvTheatre = req.body.asmvTheatre;
  var asmvFromDate = req.body.asmvFromDate;
  var asmvToDate = req.body.asmvToDate;

  var assignMovie = new AssignMovie({   
    asmvMovie,
    asmvCity,
    asmvTheatre,
    asmvFromDate,
    asmvToDate
  });

console.log(assignMovie);
  assignMovie.save(function(err, docs){
    if ( err ) throw err;
    console.log("ASMV Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteAsmv/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      AssignMovie.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateAsmv/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    AssignMovie.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

module.exports = router;