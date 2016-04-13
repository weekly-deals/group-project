var mongoose = require('mongoose'),
    Deals = require('./deals.js');

//coords must be in long, lat order, this is the opposite of what the google maps api requires

var busSchema = new mongoose.Schema({
    busName: {type: String, required: true},
    deals: [{type: mongoose.Schema.Types.ObjectId, ref: Deals}],
    address: {type: String, unique: true, required: true},
    loc: {
        type: {type: String, default: "Point"},
        coordinates: [{type: Number, required: true}]
    },
    busHours: [String],
    _id: {type: String, required: true},
    picture: {type: String},
    phone: {type: String},
    website: {type: String}
});

busSchema.index({loc: '2dsphere'});

module.exports = mongoose.model('Bus', busSchema);
