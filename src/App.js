import React from 'react';

import { connect } from 'react-redux';

import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import DevRouter from './DevRouter'

class App extends React.Component {


  componentDidMount() {
    this.props.dispatch({ type: 'get/demo/list' });
  }

  render() {

    return (

      <HashRouter>
        <DevRouter />
       
      </HashRouter>

    );
  }
}

export default connect((state) => ({}))(App);
