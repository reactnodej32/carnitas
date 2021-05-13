import React, { useState } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import Signup from "../../components/sign-up/sign-up.component";
import "./authentication.styles.scss";
import carna from "./carna.png";
const Authentication = () => {
  const [show_signup, setShowSignup] = useState(false);

  return (
    <div className="authentication">
      <img
        src={carna}
        alt="carna"
        style={{ height: "100px", width: "100px" }}
      />
      {show_signup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <SignIn setShowSignup={setShowSignup} />
      )}
    </div>
  );
};
export default Authentication;
