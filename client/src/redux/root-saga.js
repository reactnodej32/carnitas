import { all, call } from "redux-saga/effects";

import { adminSagas } from "./admin/admin.saga";
import { usersSagas } from "./users/users.saga";
export default function* rootSaga() {
  yield all([call(adminSagas), call(usersSagas)]);
}
