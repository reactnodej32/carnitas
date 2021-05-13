import AdminActionTypes from "./admin.types";

export const signOutStart = () => ({
  type: AdminActionTypes.SIGN_OUT_START,
});

export const signUpStart = (userCredentials) => ({
  type: AdminActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signInStart = (emailAndPassword) => ({
  type: AdminActionTypes.SIGN_IN_START,
  payload: emailAndPassword,
});
