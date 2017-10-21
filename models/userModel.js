const mongoose = require('mongoose');
const { passwordHash, passwordCompare } = require('../handlers');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  liked: [mongoose.Schema.Types.ObjectId],
  picture: String
});

//must bind this to use arrow function otherwise use function 
UserSchema.pre('save', async function(next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await passwordHash(this.password);
    next();
  } catch(err) {
    next(err);
  }
});

UserSchema.methods.passwordIsValid = async function(password, cb) {
  try {
    return cb(null, await passwordCompare(password, this.password))
  } catch(err) {
    return cb(err);
  }
}

module.exports = mongoose.model('User', UserSchema);