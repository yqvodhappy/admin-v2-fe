/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-11-23 06:35:13
 * @version $Id$
 */
 
 import VUtil from 'util/vv.jsx';
 const  _vv   = new VUtil();

class User{
    // 用户登录
    login(loginInfo){
        return _vv.request({
            type : 'post',
            url  : '/passport/login2',
            data : loginInfo
       });
    }
    // 检查登录接口的数据是否合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        // 判断用户名为空
        if(typeof username !== 'string' || username.length === 0){
            return{
                status: false,
                msg: '用户名不能为空!'
            }
        }
        // 判断密码为空
        if(typeof password !== 'string' || password.length === 0){
            return{
                status: false,
                msg: '密码不能为空!'
            }
        }
        return{
            status : true,
            msg: '验证通过'
        }
    }
    // 退出登录
    logout(){
        return _vv.request({
            type : 'post',
            url  : _vv.getServerUrl('/passport/logout')
       });
    }
    // 获取用户列表
    getUserList(pageNum){
        return _vv.request({
            type : 'post',
            url  : '/passport/list2',
            data : {
                pageNum : pageNum
            }
       });
    }
    // 登录中状态重置密码
    updatePassword(user){
        return _vv.request({
            type    : 'post',
            url     : _vv.getServerUrl('/passport/reset_password'),
            data    : user
        });
    }
}

export default User;