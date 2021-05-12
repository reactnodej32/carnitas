const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const jwt = require("jsonwebtoken");
// Load admin model
const User = require("../models/user");

router.use(express.json());

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find admin by email
  User.findOne({ email }).then((admin) => {
    // Check if admin exists
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
