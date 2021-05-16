import React, { useState } from "react";
import CarnaCard from "../carna-card/carna-card.component";
import FormInput from "../form-input/form-input.component";
import { createUser } from "../../redux/users/users.action";
import { connect } from "react-redux";

const initialState = {
  displayName: "",
  email: "",
  password: "",
};
export const CreateUser = ({ createUser }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const { displayName, email, password } = userCredentials;
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    createUser(userCredentials);
    setUserCredentials(initialState);
  };
  const buttonSubmit = () => {
    createUser(userCredentials);
    setUserCredentials(initialState);
  };
  let dom_form = (
    <div
      style={{
        width: "200px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "160px" }}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Username"
          required
          margin={"10px"}
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
          margin={"10px"}
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
          margin={"10px"}
        />
        {/* just for the button to submit*/}
        <button style={{ display: "none" }} onClick={handleSubmit}>
          sup
        </button>
      </form>
    </div>
  );

  return (
    <CarnaCard
      form={true}
      dom_form={dom_form}
      text={"add"}
      operation={buttonSubmit}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  createUser: (created_user) => dispatch(createUser(created_user)),
});
export default connect(null, mapDispatchToProps)(CreateUser);
