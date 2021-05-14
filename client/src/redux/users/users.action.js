import UsersActionTypes from "./users.types";
export const getUsers = () => ({
  type: UsersActionTypes.GET_USERS,
});
export const setUsers = (users) => ({
  type: UsersActionTypes.SET_USERS,
  payload: users,
});

export const searchUser = (search) => ({
  type: UsersActionTypes.SEARCH_USER,
  payload: search,
});
