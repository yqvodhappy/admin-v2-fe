/*
* @Author: Dtvikey
* @Date:   2019-11-25 09:22:35
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-27 20:35:48
*/


import React          from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
}                     from "react-router-dom";


// 页面
import FilmList           from 'page/film/index/index.jsx';
import FilmSave           from 'page/film/index/save.jsx';
import FilmDetail          from 'page/film/index/detail.jsx';


class FilmRouter extends React.Component{
    render(){
        return (
              <Switch>
                  <Route path="/film/index" component={FilmList}/>
                  <Route path="/film/save/:fid?" component={FilmSave}/>
                  <Route path="/film/detail/:fid" component={FilmDetail}/>
                  <Redirect exact from="/film" to="/film/index"/>
              </Switch>
        )
    }
}

export default FilmRouter;