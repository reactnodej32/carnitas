import UsersActionTypes from "./users.types";

const INITIAL_STATE = {
  users_collection: [],
  users_api: [], //do not modify this
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
    default:
      return state;
  }
};

export default usersReducer;
/*
 case UsersActionTypes.SEARCH_USER:
      console.log("hello?");

      return {
        ...state,
      };
*/

/*
// let new_users = [...state.users_collection];
      // new_users.filter((user) =>
      //   user.name.toLowerCase().includes(action.payload.toLowerCase())
      // );

      // console.log(new_users);
*/
