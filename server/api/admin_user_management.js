const express = require("express");
const router = express.Router();
const passport = require("passport");
router.use(express.json());
const bcrypt = require("bcryptjs");
const User = require("../models/user");
// Admin Powers
// A user shouldn't be evil and create users >:(
router.post(
  "/createuser",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
      // if user exist don't make anything
      if (user) return res.status(400).json({ email: "User Alread exist" });
      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      //Hash users password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    });
  }
);
module.exports = router;
