var mongoose = require('mongoose')
  , bcrypt = require('bcryptjs');

GLOBAL.userRoles = ['user', 'admin'];

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, select: false, required: true },
  address: String,
  birthday: Date,
  username: { type: String, unique: true, lowercase: true, required: true },
  provider: String,
  picture: String,
  facebook: String,
  google: String,
  twitter: String,
  role: { type: String, default: 'user', enum: userRoles },
  favorites: [{}]
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(12, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
