var express = require('express'),
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
  app = express();

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
