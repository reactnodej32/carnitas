import React, { useState, useEffect } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { createCourse, getCourse } from "../../redux/course/course.action";
import CarnaCard from "../carna-card/carna-card.component";
import { connect } from "react-redux";
export const CreateCourse = ({ createCourse, getCourse, courses }) => {
  const [created_course, setCourse] = useState({
    course: "",
  });
  const { course } = created_course;

  useEffect(() => {
    getCourse();
  }, [getCourse]);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setCourse({ ...created_course, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    createCourse(course);
  };
  return (
    <div className="home">
      <h2>Create a course</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="course"
          value={course}
          onChange={handleChange}
          label="type to create a course"
          required
        />
        <CustomButton onClick={handleSubmit} height={"20px"}>
          submit
        </CustomButton>
      </form>
      <div className="users">
        {courses.map(({ name, stuff, _id }) => (
          <CarnaCard top={name} middle={stuff} key={_id} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  courses: state.course.courses,
});
const mapDispatchToProps = (dispatch) => ({
  createCourse: (created_course) => dispatch(createCourse(created_course)),
  getCourse: () => dispatch(getCourse()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);
