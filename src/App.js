import React from 'react';

import { connect } from 'react-redux';

import { HashRouter, Switch, Route, Link } from 'react-router-dom';

import Welcome from './Containers/Welcome';
import Initialize from './Containers/Initialize';
import Undefined from './Containers/Undefined';


class App extends React.Component {


  componentDidMount() {
    this.props.dispatch({ type: 'get/demo/list' });
  }

  render() {

    return (

      <HashRouter>

        <div>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/news">About</Link></li>
          </ul>

          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/news" component={Initialize} />
            <Route component={Undefined} />
          </Switch>

        </div>

      </HashRouter>

    );
  }
}

export default connect((state) => ({}))(App);



