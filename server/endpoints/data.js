const mongoose = require('mongoose'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    Bus = require('../models/bus.js'),
    Deal = require('../models/deals.js');

mongoose.Promise = require('bluebird');

module.exports = {

    addBus: function (req, res) {
        var newDeal = new Deal(req.body.deal);
        Bus.findOne({placeId: req.body.bus.placeId}, function(err, exisitingBus){
            if (exisitingBus) {
                exisitingBus.deals.push(newDeal._id);
                newDeal.bus = exisitingBus._id;
                Promise.join(newDeal.save(), exisitingBus.save(), function (dealResp, busResp) {
                    return [dealResp, busResp]
                }).then(function (resp) {
                    return res.status(200).json(resp);
                }).catch(function (err) {
                    console.log(err);
                    return res.status(500).json(err);
                })
            } else {
                var newBus = new Bus(req.body.bus);
                newBus.deals.push(newDeal._id);
                newDeal.bus = newBus._id;
                Promise.join(newDeal.save(), newBus.save(), function (dealResp, busResp) {
                    return [dealResp, busResp]
                }).then(function (resp) {
                    return res.status(200).json(resp);
                }).catch(function (err) {
                    console.log(err);
                    return res.status(500).json(err);
                })
            }
        })

    },
    //this one below doesn't actually work, but it will look something like this
    //the user will probably have the geokeys and address we need and can add them so the deal actually will save
    //we could also use a parallel middleware to retrieve them if not
    addDeal: function (req, res) {
        var deal = new Deal(req.body);
        var bus = Bus.findOneAndUpdate({placeId: req.body.bus}, {$push: {deals: deal._id}});

        Promise.join(deal.save(), bus.exec(), function (dealResp, busResp) {
            return [dealResp, busResp]
        }).then(function (resp) {
            // console.log(resp);
            return res.status(200).json(resp);
        }).catch(function (err) {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    //to edit a business will probably need to deal with special circumstances so we can push data into the arrays (address, loc, deals, contacts, maybe even pictures)
    //unless that just magically happens with this method which wouldn't be surprising
    editBus: function (req, res) {
        Bus.findByIdAndUpdate(req.params.id, req.body, function(err, resp){
            return err ? res.status(500).json(err) : res.status(200).json(resp);
        });
    },

    getDeal: function(req, res) {                //nat get the deal from backend
        Deal.find({}).populate('bus').exec()
        .then(function (resp) {
            res.status(200).send(resp);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
},



    editDeal: function (req, res) {
        Deal.findByIdAndUpdate(req.params.id, req.body, function(err, resp){
            return err ? res.status(500).json(err) : res.status(200).json(resp);
        });
    },

    deleteBus: function (req, res) {
        Bus.findByIdAndRemove(req.params.id, function(err, resp){
            return err ? res.status(500).json(err) : res.status(200).json(resp);
        });
    },

    deleteDeal: function (req, res) {
        Deal.findByIdAndRemove(req.params.id, function(err, resp){
            return err ? res.status(500).json(err) : res.status(200).json(resp);
        });
    }
};
