import { all, call } from "redux-saga/effects";

import { adminSagas } from "./admin/admin.saga";
export default function* rootSaga() {
  yield all([call(adminSagas)]);
}
