var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
//router.use(bodyParser.urlencoded({ extended: true }))

var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({

    moviTitle: String,
    moviLanguage: String,
    moviGenre: String,
    moviPoster: String,
    moviDirector: String,
    moviActors: String
});

var Movie = mongoose.model('Movie', movieSchema, 'movie');

//Movie
router.get('/getMovi', function(req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Movie.find({}, function(err, docs) {
        res.json(docs);

    });
});

router.get('/getMovi/:id', function(req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    Movie.find({ _id: req.params.id }, function(err, docs) {
        res.json(docs);

    });
});

router.post('/addMovi', function(req, res) {
    console.log(req.body);


    var title = req.body.Title;
    var language = req.body.Language;
    var genre = req.body.Genre;
    var poster = req.body.Poster;
    var director = req.body.Director;
    var actors = req.body.Actors;

    var movie = new Movie({

        moviTitle: title,
        moviLanguage: language,
        moviGenre: genre,
        moviPoster: poster,
        moviDirector: director,
        moviActors: actors

    });

    movie.save(function(err, docs) {
        if (err) throw err;
        console.log("Book Saved Successfully");
        res.json(docs);
    });

})

router.delete('/deleteMovi/:id', function(req, res) {
    console.log("REACHED Delete FUNCTION ON SERVER");
    Movie.remove({ _id: req.params.id }, function(err, docs) {
        res.json(docs);
    });
})

router.put('/updateMovi/:id', function(req, res) {
    console.log("REACHED PUT");
    console.log(req.body);
    Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
        console.log(data);
        res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;