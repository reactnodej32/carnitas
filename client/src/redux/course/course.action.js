import CourseActionTypes from "./course.types";

export const createCourse = (created_course) => ({
  type: CourseActionTypes.CREATE_COURSE,
  payload: created_course,
});

export const setCreateCourse = (course) => ({
  type: CourseActionTypes.SET_CREATED_COURSE,
  payload: course,
});

export const getCourse = () => ({
  type: CourseActionTypes.GET_COURSE,
});

export const setCourse = (course) => ({
  type: CourseActionTypes.SET_COURSE,
  payload: course,
});
