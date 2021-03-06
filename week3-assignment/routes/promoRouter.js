var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

var mongoose = require('mongoose');
var Promotions = require('../models/promotions');

var Verify = require('./verify');

promoRouter.route('/')

  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.find({}, function (err, promotions) {
      if(err) throw err;
      res.json(promotions);
    });
  })

  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.create(req.body, function (err, promotions) {
      if(err) throw err;
      console.log('promotion created');
      var id = promotions._id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added promotion with id '+ id);
    });
  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.remove({}, function(err, resp) {
      if(err) throw err;
      res.json(resp);
    })
  });

promoRouter.route('/:promoId')

  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promotion) {
      if(err) throw err;
      res.json(promotion);
    });
  })

  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.findByIdAndUpdate(req.params.promoId,
    { $set: req.body },
    { new: true },
    function (err, promotion) {
      if(err) throw err;
      res.json(promotion);
    });
  })

  .delete (Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.findByIdAndRemove(req.params.promoId, function (err, promo) {
      if(err) throw err;
      res.json(promo);
    })
  });

module.exports = promoRouter;
