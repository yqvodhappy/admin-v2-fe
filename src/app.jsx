/*
* @Author: Dtvikey
* @Date:   2019-11-18 21:12:17
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-24 21:56:31
*/

import React          from 'react';
import ReactDOM       from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
}                     from "react-router-dom";


import Layout   from 'component/layout/index.jsx';

// 页面
import Home           from 'page/home/index.jsx';
import Login          from 'page/login/index.jsx';
import UserList           from 'page/user/index.jsx';
import ErrorPage      from 'page/error/index.jsx';


class App extends React.Component{
    render(){
        let LayoutRouter = (
              <Layout>
                  <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/film" component={Home}/>
                      <Route path="/film-category" component={Home}/>
                      <Route path="/user/index" component={UserList}/>
                      <Redirect exact from="/user" to="/user/index"/>
                      <Route component={ErrorPage}/>
                  </Switch>
              </Layout>
        );
        return (
            <Router>
              <Switch>
                  <Route path="/login" component={Login}/>
                  <Route path="/" render={ props => LayoutRouter }/>
              </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);