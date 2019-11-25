/*
* @Author: Dtvikey
* @Date:   2019-11-24 20:50:04
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-24 21:37:54
*/

import React      from 'react';
import { Link }   from 'react-router-dom';
import PageTitle  from 'component/page-title/index.jsx';

class Error extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (
                <div id="page-wrapper">
                    <PageTitle title="出错啦!"/>
                    <div className="row">
                        <div className="col-md-12">
                            <span>找不到该路径，</span>
                            <Link to="/">点我返回首页</Link>
                        </div>
                    </div>
                </div>
            );
    }
}


export default Error;