import AdminActionTypes from "./admin.types";

export const signOutStart = () => ({
  type: AdminActionTypes.SIGN_OUT_START,
});

export const signUpStart = (adminCredentials) => ({
  type: AdminActionTypes.SIGN_UP_START,
  payload: adminCredentials,
});

export const signInStart = (emailAndPassword) => ({
  type: AdminActionTypes.SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (adminCredentials) => ({
  type: AdminActionTypes.SIGN_IN_SUCCESS,
  payload: adminCredentials,
});

export const signUpSuccess = (adminCredentials) => ({
  type: AdminActionTypes.SIGN_UP_SUCCESS,
  payload: adminCredentials,
});

export const checkAdminToken = () => ({
  type: AdminActionTypes.CHECK_ADMIN_TOKEN,
});
