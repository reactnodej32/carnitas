const AdminActionTypes = {
  //SIGN OUT
  SIGN_OUT_START: "SIGN_OUT_START",
  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILURE: "SIGN_OUT_FAILURE",
  //SIGN IN
  SIGN_IN_START: "SIGN_IN_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "SIGN_IN_FAILURE",
  //SIGN UP
  SIGN_UP_START: "SIGN_UP_START",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_FAILURE: "SIGN_UP_FAILURE",
  //CHECK USER TOKEN
  SET_CURRENT_ADMIN: "SET_CURRENT_ADMIN",
  CHECK_ADMIN_TOKEN: "CHECK_ADMIN_TOKEN",
  REMOVE_CURRENT_ADMIN: "REMOVE_CURRENT_ADMIN",
};
export default AdminActionTypes;
