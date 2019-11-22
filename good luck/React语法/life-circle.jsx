/*
* @Author: Dtvikey
* @Date:   2019-11-18 21:12:17
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-18 21:25:32
*/

import React from 'react';
import ReactDOM from 'react-dom';


class Component extends React.Component{
    // 构造函数
    constructor(props){
        super(props)
        this.state = {
            data: 'Old State'
        }
        console.log('初始化数据','constructor');
    }
    // 组件将要加载
    componentWillMount(){
        console.log('componentWillMount');
    }
    // 组件完成加载
    componentDidMount(){
        console.log('componentDidMount');
    }
    // 将要接收父组件传来的props
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    // 子组件是不是应该更新
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate');
        return true;
    }
    // 组件即将更新
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }
    // 组件更新完成
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }
    // 组件即将销毁
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    // 处理点击事件
    handleClick(){
        console.log('更新数据');
        this.setState({
            data: 'New state'
        });
    }
    render(){
        console.log('render')
        return (
           <div>
               <div>Props: {this.props.data}</div>
               <button onClick={()=>{this.handleClick()}}>更新组件</button>
           </div>
        );
    }
}
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: 'Old Props',
            hasChild: true
        }
        console.log('初始化数据','constructor');
    }
    onPropsChange(){
        console.log('更新props:')
        this.setState({
            data: 'New Props'
        });
    }
    onDestoryChild(){
        console.log('干掉子组件：')
        this.setState({
            hasChild: false
        });
    }
    render(){
        return(
        <div>
            {
                this.state.hasChild ? <Component data={this.state.data}/> : null
            }<Component data={this.state.data}/>
            <button onClick={()=>{this.onPropsChange()}}>改变Props</button>
            <button onClick={()=>{this.onDestoryChild()}}>干掉子组件</button>
        </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
