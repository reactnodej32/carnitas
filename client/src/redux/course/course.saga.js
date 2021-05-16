import { takeLatest, all, call, put } from "redux-saga/effects";
import CourseActionTypes from "./course.types";
import { setCreateCourse, setCourse } from "./course.action";
import { fetchCreatedCourse, fetchCourse } from "./course.utlis";
export function* createCourse(payload) {
  try {
    const { data } = yield call(fetchCreatedCourse, payload);
    yield put(setCreateCourse(data));
  } catch (error) {
    console.log(error.response);
  }
}
export function* getCourse() {
  try {
    const { data } = yield call(fetchCourse);
    yield put(setCourse(data));
  } catch (error) {
    console.log(error.response);
  }
}
export function* onCreateCourse() {
  yield takeLatest(CourseActionTypes.CREATE_COURSE, createCourse);
}
export function* onGetCourse() {
  yield takeLatest(CourseActionTypes.GET_COURSE, getCourse);
}
export function* courseSagas() {
  yield all([call(onCreateCourse), call(onGetCourse)]);
}
