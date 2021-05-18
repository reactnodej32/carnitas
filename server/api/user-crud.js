const express = require("express");
const router = express.Router();
const passport = require("passport");
router.use(express.json());

const User = require("../models/user");
const Course = require("../models/course");
const mongoose = require("mongoose");
/*

"/creategroup", <- user should be able to see group, and join the group
"/course" <- user should be able to see course and join the course
*/
//Pagination: page by 3
//api/user/course?page=1
router.get("/course", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = 3;
  Course.find()
    .skip(page * limit)
    .limit(limit)
    .exec(function (err, doc) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json(doc);
    });
});

/*

When user clicks on a course to join

Requires:

id, 
chosen_course

the client will decode the token  and have an ID

the ID will be used to join a course
https://jwt.io/  paste the bearer here and it will reveal
{
  "id": "609c232f3a2a36099fb99119",
  "name": "2",
  "email": "2@gmail.com",
  "iat": 1620848940,
  "exp": 1652405866
}
*/

router.post("/joincourse/:id", async (req, res) => {
  const userid = req.params.id;
  const chosen_course = req.body.chosen_course;

  const isUserInCourse = await Course.findOne({
    name: chosen_course,
    users: { $in: userid },
  });

  // is the user already inside the course array?
  if (isUserInCourse)
    return res.status(400).json({ exist: "User is already in the course" });

  const isUserInUser = await User.findById(userid);
  // Does the user exist in user's collections?
  if (!isUserInUser)
    return res
      .status(400)
      .json({ exist: "User does not exist in User Collection" });

  const course = await Course.findOneAndUpdate(
    { name: chosen_course },
    { $push: { users: userid } },
    { new: true } // new gives the updated collection
  );
  if (!course) return res.status(400).json({ course: "does not exist" });
  // we want to add the course to the user's collection
  // and return the new user  for the client to display within their ui

  await User.findOneAndUpdate(
    { _id: userid },
    { $push: { course: course._id } },
    { new: true } // new gives the updated collection
  );
  // sends the client the user's appended course
  return res.status(200).send(course);
});
//requires user id to be inside paramas
router.post(
  "/mycourses/:id",
  passport.authenticate("user", { session: false }),
  async (req, res) => {
    //users has courses such as {user:"bryan", courses:['123812saubd', '1293213912']}
    //courses array will be used to get the users courses

    const userid = req.params.id;
    let { course } = await User.findById({ _id: userid });
    let turnArrayIntoObjectId = course.map((c) => mongoose.Types.ObjectId(c));
    const mycourse = await Course.find({
      _id: { $in: turnArrayIntoObjectId },
    });
    return res.status(200).send(mycourse);
  }
);

module.exports = router;
