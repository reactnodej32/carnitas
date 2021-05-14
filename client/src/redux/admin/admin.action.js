import AdminActionTypes from "./admin.types";
//Sign out
export const signOutStart = () => ({
  type: AdminActionTypes.SIGN_OUT_START,
});
export const signOutSuccess = () => ({
  type: AdminActionTypes.SIGN_OUT_SUCCESS,
});
// Sign Up
export const signUpStart = (adminCredentials) => ({
  type: AdminActionTypes.SIGN_UP_START,
  payload: adminCredentials,
});
export const signUpFalure = (error) => ({
  type: AdminActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
export const signUpSuccess = (token) => ({
  type: AdminActionTypes.SIGN_UP_SUCCESS,
  payload: token,
});
//Sign In
export const signInSuccess = (adminCredentials) => ({
  type: AdminActionTypes.SIGN_IN_SUCCESS,
  payload: adminCredentials,
});
export const signInStart = (emailAndPassword) => ({
  type: AdminActionTypes.SIGN_IN_START,
  payload: emailAndPassword,
});

//Check token
export const checkAdminToken = () => ({
  type: AdminActionTypes.CHECK_ADMIN_TOKEN,
});
export const removeCurrentAdmin = () => ({
  type: AdminActionTypes.REMOVE_CURRENT_ADMIN,
});
