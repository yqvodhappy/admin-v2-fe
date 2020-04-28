/*
* @Author: Dtvikey
* @Date:   2019-11-18 21:12:17
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-18 21:25:32
*/

import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss'

// 基础 jsx 、样式
let style = {
    color: 'r' + 'ed'
}
let jsx = <div className="jsx" style={style}>jsx...</div>;


ReactDOM.render(
    jsx,
    document.getElementById('app')
);

// 数据逻辑处理
let name = 'Dtvikey';
let names = ['Rosen','Geely','Jimin']
let flag = false;
let jsx  = (
    <div>
        {/* 变量的使用 */}
        <p>I am {name}</p>
        {/* 条件判断 */}
        {
            flag ? <p>I am {name}</p> : <p>I am not {name}</p>
        }
        {/* 数组循环 */}
        {
            names.map((name, index) => <p key={index}>Hello, I am {name}</p>)
        }
    </div>
);

ReactDOM.render(
    jsx,
    document.getElementById('app')
);

