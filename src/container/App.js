import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import VerticalDrawer from '../components/VerticalDrawer'
import BudgetPage from '../pages/BudgetPage'
import DatabasePage from "../pages/DatabasePage";
import ImportPage from '../pages/ImportPage'
import LogsPage from '../pages/LogsPage'

const App = ({ user }) => {

  return (
    <React.Fragment>
      <VerticalDrawer />
      <div className="App">
        <Switch>
          <Route exact path="/orçamento" component={BudgetPage} />
          <Route exact path="/database" component={DatabasePage} />
          <Route exact path="/importar" component={ImportPage} />
           <Route exact path="/registros" component={LogsPage} />
          <Redirect to="/dashboard" />
        </Switch>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);