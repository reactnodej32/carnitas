import React, { useState } from "react";

import SignIn from "../components/Sign-in";
import SignUp from "../components/Sign-up";
/*

Authentication renders  
SetPage is used for when the user clicks the signIn Button or signup Button
and renders the state based on true or false

*/
export const Authentication = ({ history }) => {
  const [page, setPage] = useState(true);

  return page ? (
    <SignIn history={history} setPage={setPage} />
  ) : (
    <SignUp history={history} setPage={setPage} />
  );
};

export default Authentication;
