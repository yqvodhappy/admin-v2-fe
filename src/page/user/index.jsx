/*
* @Author: Dtvikey
* @Date:   2019-11-24 21:45:48
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-28 10:35:43
*/

import React        from 'react';
import { Link }     from 'react-router-dom';
import VUtil        from 'util/vv.jsx'
import User         from 'service/user-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';

const _vv   = new VUtil();
const _user = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1
        };
    }
    componentDidMount(){
        this.loadUserList();
    }
    // 加载用户列表
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list : []
            });
            _vv.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadUserList();
        });
    }
    // 登录中状态重置密码
    onUpdatePassword(passwordOld, passwordNew){
        let pwdOld = passwordOld,
            pwdNew = window.prompt('请输入新的密码',passwordNew);

        if(pwdNew){
            _user.updatePassword({
                passwordOld: pwdOld,
                passwordNew: pwdNew
            }).then(res => {
                _vv.successTips(res);
                this.loadUserList();
            }, errMsg => {
                _vv.errorTips(errMsg);
            });
        }
    }
    render(){
        let listBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                    <td>
                        <a className="opear"
                           onClick={(e) => this.onUpdatePassword(user.password, user.password)}>修改密码</a>
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间', '操作']}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
}

export default UserList;