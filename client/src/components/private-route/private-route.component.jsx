import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      currentUser ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});

export default connect(mapStateToProps, null)(PrivateRoute);
