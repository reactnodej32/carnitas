import React, { useState, useEffect } from "react";
import FormInput from "../form-input/form-input.component";

import { searchUser } from "../../redux/users/users.action";
import UserList from "../user-list/user-list.component";
import CreateUser from "../create-user/create-user.component";
import { connect } from "react-redux";
import "./home.styles.scss";
export const Home = ({ searchUser }) => {
  const [user_, setUser] = useState({
    user: "",
  });

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
          <h2>
            Revoke a user from joining a course,
            <br /> Add, Delete, <br /> Or Search for a User{" "}
          </h2>

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
      <UserList CreateUser={CreateUser} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchUser: (search) => dispatch(searchUser(search)),
});
export default connect(null, mapDispatchToProps)(Home);
