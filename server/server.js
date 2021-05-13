const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const bodyParser = require("body-parser");
// importing api
const admin = require("./api/admin");
const admin_user_management = require("./api/admin_user_management");
const user = require("./api/user");
const usercrud = require("./api/user-crud");
// setup
const app = express();
app.use(cors());

// body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// mongodb connection
//mongodb://127.0.0.1:27017/carna
//mongodb+srv://123:<password>@cluster0.hfqzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
/*
Recently as of May 12 Mongodb has been having issues so resort to local database
https://zellwk.com/blog/local-mongodb/
*/
mongoose
  .connect(
    "mongodb+srv://123:EbyffDMsHzuUx7AL@cluster0.hfqzm.mongodb.net/carna?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

//To fix deprecation  warning
mongoose.set("useFindAndModify", false);
// Passport middleware
app.use(express.static(path.join(__dirname, "client/build")));
app.use(passport.initialize());

require("./config/passport")(passport);

// api path
app.use("/api/admin", admin);
app.use("/api/admin", admin_user_management);
app.use("/api/user", user);
app.use("/api/user", usercrud);
app.listen(8080, () => {
  console.log("server running " + 8080);
});
