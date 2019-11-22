/*
* @Author: Dtvikey
* @Date:   2019-11-18 21:12:17
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-18 21:25:32
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";


import Layout from 'component/layout/index.jsx';

// 页面
import Home from 'page/home/index.jsx';


class App extends React.Component{
    render(){
        return (
            <Router>
              <Layout>
                  <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/film" component={Home}/>
                      <Route path="/film-category" component={Home}/>
                  </Switch>
              </Layout>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);