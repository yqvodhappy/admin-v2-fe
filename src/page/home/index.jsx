import React    from 'react';

import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import './index.scss';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCount       : '-',
            filmCount       : '-',
            categoryCount   : '-'
        }
    }
    loadCount(){
        
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="首页" />
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/film" className="color-box green">
                            <p className="count">{this.state.filmCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>影片总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/film-category" className="color-box blue">
                            <p className="count">{this.state.categoryCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>分类总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;