import React, { useEffect, lazy, Suspense } from "react";

import Spinner from "./components/spinner/spinner.component";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import PrivateRoute from "./components/private-route/private-route.component";
import "./app.styles.scss";

// import { checkUserSession } from "./redux/user/user.actions";

const Authentication = lazy(() =>
  import("./pages/authentication/authentication.component")
);

const AdminDashboard = lazy(() =>
  import("./pages/admin-dashboard/admin-dashboard.component")
);

const App = ({ checkUserSession, currentAdmin }) => {
  // useEffect(() => {
  //   checkUserSession();
  // }, [checkUserSession]);

  return (
    <div className="App">
      <Switch>
        <Suspense fallback={<Spinner />}>
          <PrivateRoute path="/admin" component={AdminDashboard} />

          {/* <Route
            exact
            path="/"
            render={() =>
              currentAdmin ? (
                <Redirect to="/missioncontrol" />
              ) : (
                <Authentication />
              )
            }
          /> */}
          <Authentication />
        </Suspense>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});
const mapDispatchToProps = (dispatch) => ({
  // checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
