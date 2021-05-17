const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const jwt = require("jsonwebtoken");
// Load user model
const User = require("../models/user");

router.use(express.json());

/*

User registration/login

*/

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          const {
            _id,
            name,
            email,
            courses,
            join_course_privilege,
            group,
          } = await newUser.save();

          jwt.sign(
            {
              id: _id,
              name: name,
              email: email,
              courses: courses,
              group: group,
              join_course_privilege: join_course_privilege,
            },
            "secret",
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find admin by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check user password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          course: user.course,
          motto: user.motto,
          group: user.group,
        };

        // Sign token
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
