import UsersActionTypes from "./users.types";
import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  fetchUsers,
  fetchdeleteUser,
  fetchCreatedUser,
  fetchModifyUser,
  fetchGroup,
  fetchCreateGroup,
  fetchChangePrivilege,
} from "./users.utlis";
import {
  setUsers,
  setDeletedUser,
  setCreateUser,
  setModifyUser,
  setGroup,
  setCreatedGroup,
  setPrivilege,
} from "./users.action";
export function* getUsers() {
  try {
    const { data: users } = yield call(fetchUsers);
    yield put(setUsers(users));
  } catch (err) {
    console.log(err);
  }
}

export function* deleteUser({ payload }) {
  try {
    const { data } = yield call(fetchdeleteUser, payload);

    yield put(setDeletedUser(data));
  } catch (error) {
    console.log(error.response);
  }
}

export function* createUser({ payload }) {
  try {
    const { data } = yield call(fetchCreatedUser, payload);
    yield put(setCreateUser(data));
  } catch (error) {
    console.log(error);
  }
}
export function* modifyUser({ payload }) {
  try {
    const { data } = yield call(fetchModifyUser, payload);
    yield put(setModifyUser(data));
  } catch (error) {}
}

export function* getGroup() {
  try {
    const { data } = yield call(fetchGroup);
    yield put(setGroup(data));
  } catch (error) {
    console.log(error.response);
  }
}

export function* createGroup({ payload }) {
  try {
    const { data } = yield call(fetchCreateGroup, payload);
    yield put(setCreatedGroup(data));

    yield;
  } catch (error) {
    console.log(error.response);
  }
}
export function* changePrivilege({ payload }) {
  try {
    const { data } = yield call(fetchChangePrivilege, payload);
    yield put(setPrivilege(data));
  } catch (error) {
    console.log(error.response);
  }
}

export function* onHome() {
  yield takeLatest(UsersActionTypes.GET_USERS, getUsers);
}

export function* onDeletionUser() {
  yield takeLatest(UsersActionTypes.CHOSEN_DELETE_USER, deleteUser);
}

export function* onCreateUser() {
  yield takeLatest(UsersActionTypes.CREATE_USER, createUser);
}

export function* onModifyUser() {
  yield takeLatest(UsersActionTypes.MODIFY_USER, modifyUser);
}

export function* onGetGroup() {
  yield takeLatest(UsersActionTypes.GET_GROUP, getGroup);
}

export function* onCreateGroup() {
  yield takeLatest(UsersActionTypes.CREATE_GROUP, createGroup);
}
export function* onPrivilege() {
  yield takeLatest(UsersActionTypes.CHANGE_PRIVILEGE, changePrivilege);
}
export function* usersSagas() {
  yield all([
    call(onHome),
    call(onDeletionUser),
    call(onCreateUser),
    call(onModifyUser),
    call(onGetGroup),
    call(onCreateGroup),
    call(onPrivilege),
  ]);
}
