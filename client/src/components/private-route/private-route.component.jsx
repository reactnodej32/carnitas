import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  currentAdmin,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      currentAdmin ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});

export default connect(mapStateToProps, null)(PrivateRoute);
