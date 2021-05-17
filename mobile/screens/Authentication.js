import React, { useState } from "react";

import SignIn from "../components/Sign-in";
import SignUp from "../components/Sign-up";

export const Authentication = ({ history }) => {
  const [page, setPage] = useState(true);

  return page ? (
    <SignIn history={history} setPage={setPage} />
  ) : (
    <SignUp history={history} setPage={setPage} />
  );
};

export default Authentication;
