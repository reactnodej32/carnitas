const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Admin = mongoose.model("admin");
const User = mongoose.model("user");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//super secret key that we can use for now...
opts.secretOrKey = "secret";

/*
When a user register a token is given
during the token initalization it is defined as admin if the user register
on the admin page.

Or if the user registers within mobile the token is registered as a "user"
*/

module.exports = (passport) => {
  //passport for admin only
  passport.use(
    "admin",
    new JwtStrategy(opts, (jwt_payload, done) => {
      Admin.findById(jwt_payload.id)
        .then((admin) => {
          if (admin) {
            return done(null, admin);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
  //passport for users only
  passport.use(
    "user",
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
