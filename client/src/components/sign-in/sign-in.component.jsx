import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";

import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import "./sign-in.styles.scss";
import { signInStart } from "../../redux/admin/admin.action";

const SignIn = ({ setShowSignup, signInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();

    signInStart(email, password);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>Sign In </h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton
            color={"white"}
            margin={"10px"}
            onClickFunctionProp={() => {
              signInStart("easyrun32@gmail.com", "123");
            }}
          >
            Demo
          </CustomButton>

          <CustomButton color={"white"} margin={"10px"} type="submit">
            Sign in
          </CustomButton>

          <CustomButton
            onClickFunctionProp={() => setShowSignup(true)}
            color={"white"}
            margin={"10px"}
          >
            Sign up
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password })),
});
export default connect(null, mapDispatchToProps)(SignIn);
