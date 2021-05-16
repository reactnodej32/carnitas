import React, { useState, useEffect } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { getGroup, createGroup } from "../../redux/users/users.action";
import CarnaCard from "../carna-card/carna-card.component";
import { connect } from "react-redux";
export const CreateGroup = ({ getGroup, users_group, createGroup }) => {
  const [createdGroup, setGroup] = useState({ group: "" });
  const { group } = createdGroup;

  useEffect(() => {
    getGroup();
  }, [getGroup]);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setGroup({ ...createdGroup, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createGroup(group);
  };

  return (
    <div className="home">
      <h2>Create a group</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="group"
          value={group}
          onChange={handleChange}
          label="type to create a group"
          required
        />
        <CustomButton onClick={handleSubmit} height={"20px"}>
          submit
        </CustomButton>
      </form>
      <div className="users">
        {users_group.map(({ name, date, _id }, i) => (
          <CarnaCard top={name} middle={date} key={_id} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  users_group: state.users.users_group,
});
const mapDispatchToProps = (dispatch) => ({
  getGroup: () => dispatch(getGroup()),
  createGroup: (created_group) => dispatch(createGroup(created_group)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
