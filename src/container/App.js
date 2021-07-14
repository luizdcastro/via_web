import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import VerticalDrawer from '../components/VerticalDrawer'
import BudgetPage from '../pages/BudgetPage'
import DerPage from "../pages/DerPage";
import SicroPage from '../pages/SicroPage'
import ImportPage from '../pages/ImportPage'
import LogsPage from '../pages/LogsPage'
import LoginPage from '../pages/LoginPage'
import AccountPage from '../pages/AccountPage'

const App = ({ user }) => {

  return (
    <React.Fragment>
      {user.isLoggedIn ?
        <VerticalDrawer />
        : null
      }
      <div className="App">
        {!user.isLoggedIn ? (
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Redirect to="/login" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/orçamento" component={BudgetPage} />
            <Route exact path="/database-der" component={DerPage} />
            <Route exact path="/database-sicro" component={SicroPage} />
            <Route exact path="/importar" component={ImportPage} />
            <Route exact path="/registros" component={LogsPage} />
            <Route exact path="/configurações" component={AccountPage} />
            <Redirect to="/orçamento" />
          </Switch>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);