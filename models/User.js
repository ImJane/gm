var mongoose = require('mongoose');
var UserSchema = require('../schemas/UserSchema');
var User = mongoose.model('gm_user', UserSchema);
module.exports = User;