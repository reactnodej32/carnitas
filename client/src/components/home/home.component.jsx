import React, { useState, useEffect } from "react";
import FormInput from "../form-input/form-input.component";

import CustomButton from "../custom-button/custom-button.component";
import "./home.styles.scss";
import { searchUser } from "../../redux/users/users.action";
import UserList from "../user-list/user-list.component";
import { connect } from "react-redux";
export const Home = ({ searchUser }) => {
  const [user_, setUser] = useState({
    user: "",
  });
  // console.log("hello?");
  // let newUser = users_collection.filter((user) =>
  //   user.name.toLowerCase().includes(user_.user.toLowerCase())
  // );
  // console.log(newUser);
  const { user } = user_;
  useEffect(() => {
    //avoid beging redux logger
    searchUser(user);
  }, [user, searchUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };
  return (
    <div className="home">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h2>Search for a user </h2>

          <FormInput
            type="user"
            name="user"
            value={user}
            onChange={handleChange}
            label="user"
            required
          />
        </form>
      </div>
      <UserList />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchUser: (search) => dispatch(searchUser(search)),
});
export default connect(null, mapDispatchToProps)(Home);
