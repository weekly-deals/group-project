const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = 3001,
    compression = require('compression'),
    mongoose = require('mongoose'),
    config = require('./config'),
    jwt = require('jwt-simple'),
    request = require('request'),
    moment = require('moment'),
    qs = require('querystring'),
    User = require('./models/user.js'),
    accounts = require('./endpoints/accounts.js'),
    helmet = require('helmet'),
    _ = require('lodash'),
    GoogleMapsAPI = require('googlemaps'),
    app = express(),
    Promise = require('bluebird');

mongoose.Promise = require('bluebird');

const publicConfig = {
    key: config.googleAPIKey,
    secure: true
};

const gm = Promise.promisifyAll(new GoogleMapsAPI(publicConfig));

// reverseGeocode('40.22607680000001,-111.6606035')
//   .then(function(res){
//   console.log(res);
// });

function reverseGeocode(latlng) {
    return gm.reverseGeocodeAsync({
        "latlng": latlng,
        "result_type": "locality",
        "language": "en",
        "location_type": "APPROXIMATE"
    }).then(function(result){
      var ret = {
        city: result.results[0].formatted_address.split(",").slice(0, -2).join(''),
        crd: latlng
      };
      return ret;
    });
  }

// geoCode('295 E 7800 S 84047')
//   .then(function(res){
//     console.log(res);
//   });

function geoCode(address){
  return gm.geocodeAsync({
      "address": address,
      "components": "components=country:US",
      "language": "en",
  }).then(function(result){
    var ret = {
      loc: {
      coordinates: [result.results[0].geometry.location.lng, result.results[0].geometry.location.lat],
      type: "Point"
      }
    };
    return ret;
  });
}

mongoose.connect('mongodb://localhost/weekly');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
    console.log('Connected to MongoDB!');
});

app.use(helmet());
app.use(compression());
app.use(express.static(__dirname + '/../dist'));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/me', checkRole('user'), accounts.getApiMe);
app.put('/api/me', checkRole('user'), accounts.putApiMe);
app.post('/auth/login', accounts.postAuthLogin);
app.post('/auth/signup', accounts.postAuthSignup);
app.post('/auth/google', accounts.postAuthGoogle);
app.post('/auth/facebook', accounts.postAuthFacebook);
app.post('/auth/twitter', accounts.postAuthTwitter);
app.post('/auth/unlink', checkRole('user'), accounts.postAuthUnlink);

function checkRole(role) {
    return function(req, res, next) {
        if (!req.header('Authorization')) {
            return res.status(401).send({
                message: 'Please make sure your request has an Authorization header'
            });
        }
        var token = req.header('Authorization').split(' ')[1];
        var payload = null;
        try {
            payload = jwt.decode(token, config.TOKEN_SECRET, false, 'HS256');
        } catch (err) {
            return res.status(401).send({
                message: err.message
            });
        }
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'Token has expired'
            });
        } else if (_.indexOf(userRoles, payload.role) >= _.indexOf(userRoles, role)) {
            req.user = payload.sub;
            next();
        } else {
            return res.status(401).send({
                message: 'Incorrect role'
            });
        }
    };
}

app.listen(port, function() {
    console.log('Listening on port ' + port);
});

module.exports = app;
