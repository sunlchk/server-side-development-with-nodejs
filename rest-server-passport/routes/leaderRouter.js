var express = require('express');
var bodyParser = require('body-parser');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

var mongoose = require('mongoose');
var Leaders = require('../models/leadership');



leaderRouter.route('/')

  .get(function (req, res, next) {
    Leaders.find({}, function (err, leaders) {
      if(err) throw err;
      res.json(leaders);
    });
  })

  .post(function (req, res, next) {
    Leaders.create(req.body, function (err, leaders) {
      if(err) throw err;
      console.log('Leaders created');

      var id = leaders._id;
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('New leader added with id ' + id);
    });
  })

  .delete(function (req, res, next) {
    Leaders.remove({}, function (err, leaders) {
      if(err) throw err;
      res.json(leaders);
    });
  });

leaderRouter.route('/:leaderId')

  .get(function(req, res, next) {
    Leaders.findById(req.params.leaderId, function(err, leader) {
      if(err) throw err;
      res.json(leader);
    });
  })

  .put(function (req, res, next) {
    Leaders.findByIdAndUpdate(req.params.leaderId,
    {$set: req.body},
    { new: true},
    function(err, leader) {
      if(err) throw err;
      res.json(leader);
    });
  })

  .delete(function (req, res, next ) {
    Leaders.findByIdAndRemove(req.params.leaderId, function(err, leader) {
      if(err) throw err;
      res.json(leader);
    });
  });

module.exports = leaderRouter;
