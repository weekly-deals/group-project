var mongoose = require('mongoose')
    , bcrypt = require('bcryptjs');

GLOBAL.userRoles = ['user', 'admin'];

var userSchema = new mongoose.Schema({

    email: {type: String, unique: true, lowercase: true},
    password: {type: String, select: false},
    displayName: String,
    address: String,
    birthday: Date,
    username: {type: String, unique: true, lowercase: true},
    provider: String,
    picture: {type: String, default: ''},
    facebook: String,
    google: String,
    twitter: String,
    role: {type: String, default: 'user', enum: userRoles},
    favorites: [{}],
    admin: {type: Boolean, default: false},
    color: {type: String, default: '#DD2E44'}
});
// if req.user.admin
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
