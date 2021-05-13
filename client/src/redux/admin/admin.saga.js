import { takeLatest, all, call } from "redux-saga/effects";
import AdminActionTypes from "./admin.types";
import axios from "axios";
const registerAdmin = (credentials) => {
  return axios.post("/api/admin/register", credentials).then((res) => res.data);
};

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const user = yield registerAdmin({
      name: displayName,
      email: email,
      password: password,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* signOut() {
  console.log("signOut");
  yield;
}

export function* signIn() {
  console.log("signIn");
  yield;
}

export function* onSignUpStart() {
  yield takeLatest(AdminActionTypes.SIGN_UP_START, signUp);
}

export function* onSignInStart() {
  yield takeLatest(AdminActionTypes.SIGN_IN_START, signIn);
}

export function* onSignOutStart() {
  yield takeLatest(AdminActionTypes.SIGN_OUT_START, signOut);
}

export function* adminSagas() {
  yield all([call(onSignOutStart), call(onSignUpStart), call(onSignInStart)]);
}
