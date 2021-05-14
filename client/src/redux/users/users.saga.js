import UsersActionTypes from "./users.types";
import { takeLatest, all, call, put } from "redux-saga/effects";
import { fetchUsers } from "./users.utlis";
import { setUsers } from "./users.action";
export function* getUsers() {
  try {
    const { data: users } = yield call(fetchUsers);
    yield put(setUsers(users));
  } catch (err) {
    console.log(err);
  }
}

export function* onHome() {
  yield takeLatest(UsersActionTypes.GET_USERS, getUsers);
}

export function* usersSagas() {
  yield all([call(onHome)]);
}
