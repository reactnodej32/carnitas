import React, { useEffect } from "react";
import CarnaCard from "../carna-card/carna-card.component";
import { getUsers } from "../../redux/users/users.action";
import {
  chosenDeleteUser,
  changePrivilege,
} from "../../redux/users/users.action";
import { connect } from "react-redux";
import "./user-list.styles.scss";

export const UserList = ({
  getUsers,
  users_collection,
  chosenDeleteUser,
  CreateUser = false, // component
  changePrivilege,
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const priviledge = (value) => {
    changePrivilege(value);
  };
  return (
    <div className="users">
      {CreateUser ? <CreateUser /> : null}
      {users_collection.map(
        ({ _id, name, motto, email, join_course_privilege }, i) => (
          <CarnaCard
            top={name}
            middle={motto}
            key={_id}
            email={email}
            join_course_privilege={join_course_privilege}
            operation={chosenDeleteUser}
            operation2={priviledge}
            text={"delete"}
            button2={"privilege"}
          />
        )
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  users_collection: state.users.users_collection,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  chosenDeleteUser: (chosen_user) => dispatch(chosenDeleteUser(chosen_user)),
  changePrivilege: (user) => dispatch(changePrivilege(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
