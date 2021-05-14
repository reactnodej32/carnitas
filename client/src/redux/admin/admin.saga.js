import { takeLatest, all, call, put } from "redux-saga/effects";
import AdminActionTypes from "./admin.types";
import {
  registerAdmin,
  loginAdmin,
  setAuthToken,
  checkAdminToken,
} from "./admin.utlis";
import {
  signInSuccess,
  removeCurrentAdmin,
  signOutSuccess,
  signUpFalure,
  signUpSuccess,
} from "./admin.action";
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const {
      data: { token },
    } = yield call(registerAdmin, {
      name: displayName,
      email: email,
      password: password,
    });

    yield put(signUpSuccess(token));
  } catch ({ response: { data } }) {
    yield put(signUpFalure(data));
  }
}

export function* signOut() {
  yield call(setAuthToken, false);
  yield put(signOutSuccess());
}

export function* signIn({ payload: { email, password } }) {
  try {
    const { token } = yield loginAdmin({ email: email, password: password });
    const user = yield call(setAuthToken, token);
    yield put(signInSuccess(user));
  } catch (err) {
    console.log(err);
  }
}

export function* isAdminAuthenticated() {
  const admin_token = yield call(checkAdminToken);
  if (admin_token) {
    yield put(signInSuccess(admin_token));
  } else {
    yield put(removeCurrentAdmin());
  }
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
export function* onCheckAdminToken() {
  yield takeLatest(AdminActionTypes.CHECK_ADMIN_TOKEN, isAdminAuthenticated);
}

export function* adminSagas() {
  yield all([
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignInStart),
    call(onCheckAdminToken),
  ]);
}
