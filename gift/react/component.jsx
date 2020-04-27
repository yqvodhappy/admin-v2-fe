/*
* @Author: Dtvikey
* @Date:   2019-11-18 21:12:17
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-18 21:25:32
*/

import React from 'react';
import ReactDOM from 'react-dom';

// 基础组件写法
function Component(){
    return <h1>I am Dtvikey</h1>
}

// status 和 props
class ES6Component extends React.Component{
    render(){
        return <h1>I am Dtvikey in es6</h1>
    }
}

ReactDOM.render(
    <div>
    <Component/>
    <ES6Component/>
    </div>,
    document.getElementById('app')
);

// 事件处理方式1

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : 'Rosen',
            age  : 18
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.setState({
            age: this.state.age + 1
        });
    }
    render(){
        return (
        <div>
            <h1>I am {this.state.name}</h1>
            <p>I am {this.state.age} years old!</p>
            <button onClick={this.handleClick}>加一岁</button>
        </div>         
        );
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);

//事件处理方式2

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : 'Rosen',
            age  : 18
        }

    }
    handleClick(){
        this.setState({
            age: this.state.age + 1
        });
    }
    onValueChange(e){
        this.setState({
            age: e.target.value
        });
    }
    render(){
        return (
        <div>
            <h1>I am {this.state.name}</h1>
            <p>I am {this.state.age} years old!</p>
            <button onClick={(e) => {this.handleClick(e)}}>加一岁</button>
            <input type="text" onChange={(e) => {this.onValueChange(e)}}/>
        </div>         
        );
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);

//组件的两种组合方式

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : 'Rosen',
            age  : 18
        }

    }
    handleClick(){
        this.setState({
            age: this.state.age + 1
        });
    }
    onValueChange(e){
        this.setState({
            age: e.target.value
        });
    }
    render(){
        return (
        <div>
            <h1>I am {this.state.name}</h1>
            <p>I am {this.state.age} years old!</p>
            <button onClick={(e) => {this.handleClick(e)}}>加一岁</button>
            <input type="text" onChange={(e) => {this.onValueChange(e)}}/>
        </div>         
        );
    }
}

class Title extends React.Component{
    constructor(props){
        super(props);
    }
    render(props){
        return <h1>{this.props.children}</h1>
    }
}

class App extends React.Component{
    render(){
        return (
            <div className="">
                {/*容器式组件*/}
                <Title>
                    <span>App span</span>
                    <a href="">link</a>
                </Title>
                <hr/>
                {/*单纯组件*/}
                <Component/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);

// 数据传递和状态提升

class Child1 extends React.Component{
    constructor(props){
        super(props);

    }
    handleClick(){
        this.props.changeChild2Color('red')
    }
    
    render(){
        return (
        <div>
            <h1>Child1: {this.props.bgColor}</h1>
            <button onClick={(e) => {this.handleClick(e)}}>改变child2颜色
            Color</button>
        </div>         
        );
    }
}

class Child2 extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
        <div  style={{background:this.props.bgColor}}>
            <h1>Child2背景色: {this.props.bgColor}</h1>
        </div>         
        );
    }
}

class Father extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            child2bgColor: '#999'
        }
    }
    onChild2BgColorChange(color){
        this.setState({
            child2bgColor : color
        })
    }
    render(props){
        return (
        <div>
            <Child1 changeChild2Color={(color) =>{this.onChild2BgColorChange(color)}}/>
            <Child2 bgColor={this.state.child2bgColor}/>
        </div>
        );
    }
}

//

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