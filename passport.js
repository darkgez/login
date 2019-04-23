var passport = require('passport');
var LocalStrategy = require('passport-local');
var Pasien = require('./models/user');

passport.serializeUser(function(pasien, done){
  done(null, pasien._id);
});

passport.deserializeUser(function(id, done){
  Pasien.findById(id, function(err, pasien){
    done(err, pasien);
  });
});

// Sign In
passport.use('local-login', new LocalStrategy({
  usernameField: 'nama',
  passwordField: 'nrm',
  passReqToCallback: true
}, function(req, nama, nrm, done){
  Pasien.findOne({nama: nama}, function(err, pasien){
    if (err){
      return done(err);
    }

    if (!pasien){
      return done(null, false);
    }

    // if (!pasien.comparePassword(nrm)){
    //   return done(null, false);
    // }

    return done(null, pasien);
  })
}));
