import React, { useEffect } from "react";
import UserCard from "../user-card/user-card.component";
import { getUsers } from "../../redux/users/users.action";
import { connect } from "react-redux";
import "./user-list.styles.scss";
export const UserList = ({ getUsers, users_collection }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <div className="users">
      {users_collection.map((user, i) => (
        <UserCard user={user} key={user._id} />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  users_collection: state.users.users_collection,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
