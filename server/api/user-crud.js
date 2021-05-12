const express = require("express");
const router = express.Router();
const passport = require("passport");
router.use(express.json());
// const bcrypt = require("bcryptjs");
// const User = require("../models/user");

router.post(
  "/read",
  passport.authenticate("user", { session: false }),
  (req, res) => {
    res.send({ user: true });
  }
);
module.exports = router;
