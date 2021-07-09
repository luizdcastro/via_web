import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import VerticalDrawer from '../components/VerticalDrawer'
import DashboardPage from '../pages/DashboardPage'
import DatabasePage from "../pages/DatabasePage";
import ImportPage from '../pages/ImportPage'
import LogsPage from '../pages/LogsPage'
import TablePreview from '../pages/TablePreview'

const App = ({ user }) => {

  return (
    <React.Fragment>
      <VerticalDrawer />
      <div className="App">
        <Switch>
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/database" component={DatabasePage} />
          <Route exact path="/importar" component={ImportPage} />
           <Route exact path="/registros" component={LogsPage} />
          <Route exact path="/preview/:tableId" component={TablePreview} />
          <Redirect to="/dashboard" />
        </Switch>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);