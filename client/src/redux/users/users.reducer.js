import UsersActionTypes from "./users.types";

const INITIAL_STATE = {
  users_collection: [],
  users_api: [], //do not modify this often
  users_group: [],
  error: null,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersActionTypes.SET_USERS:
      return {
        ...state,
        users_collection: action.payload,
        users_api: action.payload,
        error: null,
      };
    case UsersActionTypes.SEARCH_USER:
      let new_users = [...state.users_api];

      let searchfilter = new_users.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        users_collection: searchfilter,
      };
    case UsersActionTypes.SET_DELETED_USER:
      let new_users_deletion = [...state.users_api];

      new_users_deletion = new_users_deletion.filter(
        (user) => user._id !== action.payload._id
      );

      return {
        ...state,
        users_api: new_users_deletion,
        users_collection: new_users_deletion,
      };
    case UsersActionTypes.SET_CREATED_USER:
      console.log(action.payload);
      return {
        ...state,
        users_api: [...state.users_api, action.payload],
        users_collection: [...state.users_collection, action.payload],
      };
    case UsersActionTypes.SET_MODIFY_USER:
      let newModifiedUser = [...state.users_api];
      newModifiedUser = newModifiedUser.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return {
        ...state,
        users_api: newModifiedUser,
        users_collection: newModifiedUser,
      };
    case UsersActionTypes.SET_GROUP:
      return {
        ...state,
        users_group: action.payload,
      };
    case UsersActionTypes.SET_CREATED_GROUP:
      return {
        ...state,
        users_group: [...state.users_group, action.payload],
      };
    default:
      return state;
  }
};

export default usersReducer;
