import { all, call } from "redux-saga/effects";

import { adminSagas } from "./admin/admin.saga";
import { usersSagas } from "./users/users.saga";
import { courseSagas } from "./course/course.saga";
export default function* rootSaga() {
  yield all([call(adminSagas), call(usersSagas), call(courseSagas)]);
}
