const express = require("express");
const router = express.Router();
const passport = require("passport");
router.use(express.json());
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Group = require("../models/group");
const Course = require("../models/course");
/*
 * Admin API
 * A user shouldn't be evil and create users >:( with -> passport.authenticate("admin", { session: false })
 * A admin can create /createuser,/deleteuser,/updateuser
 * A admin can view all user with /users
 * A admin can find one user /finduser
 * A admin can create a group  /creategroup
 */

router.post(
  "/createuser",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
      // if user exist don't make anything
      if (user) return res.status(400).json({ email: "User Already Exist" });
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
            .then((user) => {
              res.json({
                // show the client the password but hide it in the database
                ...user._doc,
                ...{ reveal_password: req.body.password },
              });
            })
            .catch((err) => console.log(err));
        });
      });
    });
  }
);

router.delete(
  "/deleteuser",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    User.findOneAndDelete({ email: req.body.email }).then((user) => {
      if (!user) return res.status(400).json({ exist: false });
      res.status(200).json(user);
    });
  }
);

router.put(
  "/updateuser",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { motto: req.body.motto } },
      { upsert: true, new: true }
    ).then((user) => {
      if (!user) return res.status(400).json({ exist: false });
      res.status(200).json(user);
    });
  }
);

router.get(
  "/users",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    User.find()
      .sort("name")
      .then((user) => {
        if (!user) return res.status(400).send([]);
        res.status(200).send(user);
      });
  }
);

router.get(
  "/finduser",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) return res.status(400).json({});
      res.status(200).json(user);
    });
  }
);
// Group Api

router.post(
  "/creategroup",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    if (!req.body.name) return res.json({ error: "Please input a name" });
    Group.findOne({ name: req.body.name }).then((group) => {
      // if group exist don't make anything
      if (group) return res.status(400).send({ name: "Group already exist" });
      const newGroup = new Group({
        name: req.body.name,
      });

      newGroup
        .save()
        .then((group) => res.json(group))
        .catch((err) => console.log(err));
    });
  }
);

router.get(
  "/group",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    Group.find()
      .sort("name")
      .then((group) => {
        if (!group) return res.status(400).send([]);
        res.status(200).send(group);
      });
  }
);

//Course Api

router.post(
  "/createcourse",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    if (!req.body.name) return res.json({ error: "Please input a name" });
    Course.findOne({ name: req.body.name }).then((course) => {
      // if course exist don't make anything
      if (course) return res.status(400).send({ name: "course already exist" });
      const newCourse = new Course({
        name: req.body.name,
      });

      newCourse
        .save()
        .then((course) => res.json(course))
        .catch((err) => console.log(err));
    });
  }
);

router.get(
  "/course",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    Course.find()
      .sort("name")
      .then((course) => {
        if (!course) return res.status(400).send([]);
        res.status(200).send(course);
      });
  }
);

module.exports = router;
