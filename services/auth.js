const passport = require('passport');
const config = require('../config');
const passportJwt = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const User = require('../models/userModel');

const params = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

const authorized = new passportJwt.Strategy(params, (payload, done) => {
  User.findById(payload.sub, (err, user) => err ? done(err, false) : user ? done(null, user) : done(null, false));
});

const login = new LocalStrategy({}, (username, password, done) => {
  User.findOne({ username }, (err, user) => err ? done(err):
    !user ? done(null, false):
    user.passwordIsValid(password, (err, isMatch) => err ? done(err):
      !isMatch ? done(null, false) : done(null, user)));
});

passport.use(authorized);
passport.use(login);

module.exports = {
  requireAuth: passport.authenticate('jwt', { session: false }),
  requireLogin: passport.authenticate('local', { session: false })
}