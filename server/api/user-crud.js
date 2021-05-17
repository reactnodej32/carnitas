const express = require("express");
const router = express.Router();
const passport = require("passport");
router.use(express.json());

const User = require("../models/user");
const Course = require("../models/course");
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
chose_course

the user token will reveal the id
the id will be used to join a course
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
  // RETURN THE COURSE TO UPDATE THE USERS COURSES
  return res.status(200).send(course);
});
//requires user object which holds the user's courses
router.post(
  "/mycourses",
  passport.authenticate("user", { session: false }),
  async (req, res) => {
    //users has courses such as {user:"bryan", courses:['123812saubd', '1293213912']}
    //courses array will be used to get the users courses
    const user = req.body.user;
    //if there are no course return nothing
    if (user.course.length === 0) return res.status(200).send([]);
    //if courses are in the array then go find the courses by id
    let users_course = await user.course.map(async (course_id, index) => {
      const database_course = await Course.findById(course_id);
      return database_course;
    });
    //since it's finding muliple courses and storing them in a promise array
    // then we want to reveal all the promsis and send them to the user,

    Promise.all(users_course).then((data) => {
      res.status(200).json(data);
    });
  }
);

// router.post(
//   "/joingroup",
//   passport.authenticate("user", { session: false }),
//   (req, res) => {
//     res.send({ user: true });
//   }
// );

module.exports = router;
