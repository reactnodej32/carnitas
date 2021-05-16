import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CarnaCard from "../carna-card/carna-card.component";
import { modifyUser } from "../../redux/users/users.action";
export const ModifyUser = ({ users_api, modifyUser }) => {
  const [userMotto, setMotto] = useState({
    motto: "",
  });
  const [chosenuser, setChosenuser] = useState({ name: "motto", email: "na" });
  const { motto } = userMotto;
  const handleChange = (event) => {
    const { name, value } = event.target;

    setMotto({ ...userMotto, [name]: value });
  };
  const chosenUser = (nameAndEmail) => {
    setChosenuser(nameAndEmail);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (chosenuser.name === "motto" || motto === "") {
      alert("Please choose a user to modify it's motto and type a motto");
    } else {
      modifyUser({ motto: motto, email: chosenuser.email });
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <h2>Click on a user to modify </h2>
        <FormInput
          name="motto"
          type="motto"
          value={motto}
          onChange={handleChange}
          label={
            chosenuser.name === "motto"
              ? "motto"
              : `type to update ${chosenuser.name}'s motto`
          }
          required
        />

        {/* when user presses the enter button */}
        <button style={{ display: "none" }} onClick={handleSubmit}>
          sup
        </button>
      </form>
      <div className="users">
        {users_api.map(({ _id, name, motto, email }, i) => (
          <CarnaCard
            top={name}
            middle={motto}
            key={_id}
            email={email}
            topclick={chosenUser}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users_api: state.users.users_api,
});
const mapDispatchToProps = (dispatch) => ({
  modifyUser: (created_user) => dispatch(modifyUser(created_user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyUser);
