import React, { Component } from 'react';
import history from './history';
import {Switch, Router, Route} from 'react-router-dom';
import Page404 from './components/Page404';
import Dashboard from './components/Dashboard';
import Login from './components/Login';


class App extends Component {
  render() {
    return (
      <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard} />
            {/* error 404 */}
            <Route path="*" component={Page404}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
