import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import {
  Welcome,
  Initialize,
  Undefined
} from 'kr-ui';
export default class DevRouter extends React.Component{

	  render() {
	    //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
	    return (
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
	    );
	  }
}
