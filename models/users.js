var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var UserSchema   = new Schema({
    username: String,
  	password: String,
    salt: String, // used in authentication_controller
    hash: String // used in authentication_controller
});


module.exports = mongoose.model('User', UserSchema);