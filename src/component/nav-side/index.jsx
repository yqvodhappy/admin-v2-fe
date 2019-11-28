import React                from 'react';
import { Link, NavLink }    from 'react-router-dom';

class NavSide extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-dashboard"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>
                        <li className="active">
                            <Link to="/film">
                                <i className="fa fa-list"></i> 
                                <span>影片</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/film" activeClassName="active-menu">影片管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/film-category" activeClassName="active-menu">分类管理</NavLink>
                                </li>
                            </ul>
                        </li>
                         <li className="active">
                            <Link to="/user">
                                <i className="fa fa-user-o"></i> 
                                <span>用户</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
                                </li>
                            </ul>
                        </li>

                    </ul>

                </div>

        </div>
            
        );
    }
}

export default NavSide;