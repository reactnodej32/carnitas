import React, { useEffect, lazy, Suspense } from "react";

import Spinner from "./components/spinner/spinner.component";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import PrivateRoute from "./components/private-route/private-route.component";
import "./app.styles.scss";

import { checkAdminToken } from "./redux/admin/admin.action";

const Authentication = lazy(() =>
  import("./pages/authentication/authentication.component")
);

const AdminDashboard = lazy(() =>
  import("./pages/admin-dashboard/admin-dashboard.component")
);

const App = ({ checkAdminToken, currentAdmin }) => {
  useEffect(() => {
    checkAdminToken();
  }, [checkAdminToken]);

  return (
    <div className="App">
      <Switch>
        <Suspense fallback={<Spinner />}>
          <PrivateRoute path="/admin" component={AdminDashboard} />

          <Route
            exact
            path="/"
            render={() =>
              currentAdmin ? <Redirect to="/admin" /> : <Authentication />
            }
          />
        </Suspense>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});
const mapDispatchToProps = (dispatch) => ({
  checkAdminToken: () => dispatch(checkAdminToken()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
