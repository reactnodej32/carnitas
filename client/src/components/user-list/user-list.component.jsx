import React, { useEffect } from "react";
import CarnaCard from "../carna-card/carna-card.component";
import { getUsers } from "../../redux/users/users.action";
import { chosenDeleteUser } from "../../redux/users/users.action";
import { connect } from "react-redux";
import "./user-list.styles.scss";
export const UserList = ({
  getUsers,
  users_collection,
  chosenDeleteUser,
  CreateUser = false, // component
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <div className="users">
      {CreateUser ? <CreateUser /> : null}
      {users_collection.map(({ _id, name, motto, email }, i) => (
        <CarnaCard
          top={name}
          middle={motto}
          key={_id}
          email={email}
          operation={chosenDeleteUser}
          text={"delete"}
        />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  users_collection: state.users.users_collection,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  chosenDeleteUser: (chosen_user) => dispatch(chosenDeleteUser(chosen_user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
