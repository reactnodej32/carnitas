import UsersActionTypes from "./users.types";
//GET USER
export const getUsers = () => ({
  type: UsersActionTypes.GET_USERS,
});
export const setUsers = (users) => ({
  type: UsersActionTypes.SET_USERS,
  payload: users,
});
//SEARCH USER
export const searchUser = (search) => ({
  type: UsersActionTypes.SEARCH_USER,
  payload: search,
});
//DELETE USER
export const chosenDeleteUser = (chosen_user) => ({
  type: UsersActionTypes.CHOSEN_DELETE_USER,
  payload: chosen_user,
});

export const setDeletedUser = (deleted_user) => ({
  type: UsersActionTypes.SET_DELETED_USER,
  payload: deleted_user,
});
//CREATE USER
export const createUser = (created_user) => ({
  type: UsersActionTypes.CREATE_USER,
  payload: created_user,
});

export const setCreateUser = (created_user) => ({
  type: UsersActionTypes.SET_CREATED_USER,
  payload: created_user,
});
//MODIFY A USER
export const modifyUser = (chosen_modifed_user) => ({
  type: UsersActionTypes.MODIFY_USER,
  payload: chosen_modifed_user,
});

export const setModifyUser = (modified_user) => ({
  type: UsersActionTypes.SET_MODIFY_USER,
  payload: modified_user,
});

//GET, SET GROUP
export const getGroup = () => ({
  type: UsersActionTypes.GET_GROUP,
});

export const setGroup = (groups) => ({
  type: UsersActionTypes.SET_GROUP,
  payload: groups,
});
// CREATE GROUP, SET GROUP
export const createGroup = (created_group) => ({
  type: UsersActionTypes.CREATE_GROUP,
  payload: created_group,
});

export const setCreatedGroup = (created_group) => ({
  type: UsersActionTypes.SET_CREATED_GROUP,
  payload: created_group,
});
//CHANGE PRIVILEGE
export const changePrivilege = (user) => ({
  type: UsersActionTypes.CHANGE_PRIVILEGE,
  payload: user,
});

export const setPrivilege = (changed_user) => ({
  type: UsersActionTypes.SET_PRIVILEGE,
  payload: changed_user,
});
