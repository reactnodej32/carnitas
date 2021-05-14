const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const jwt = require("jsonwebtoken");
// Load admin model
const Admin = require("../models/admin");

router.use(express.json());

/*
Admin registration/login
*/

router.post("/register", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  //if admin exist then throw an error
  if (admin) return res.status(401).json({ email: "Email already exists" });

  const newAdmin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Hash password before saving in database
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAdmin.password, salt, async (err, hash) => {
      if (err) throw err;
      newAdmin.password = hash;
      const admin = await newAdmin.save();
      jwt.sign(
        { id: admin._id, name: admin.name, email: admin.email },
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
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find admin by email
  Admin.findOne({ email }).then((admin) => {
    // If admin doesn't exist then don't sign them in
    if (!admin) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check admin password
    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: admin.id,
          name: admin.name,
          email: admin.email,
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
