/*
* @Author: Dtvikey
* @Date:   2019-11-28 06:42:23
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-28 09:29:13
*/

import React        from 'react';
import VUtil        from 'util/vv.jsx'
import Film         from 'service/film-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';

const _vv   = new VUtil();
const _film = new Film();

class CategoryAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList : [],
            parentId     :0,
            categoryName : ''
        };
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    // 加载分类列表,显示父分类列表
    loadCategoryList(){
        _film.getCategoryList().then(res => {
            this.setState({
                categoryList : res
            });
        }, errMsg => {
            _vv.errorTips(errMsg);
        });
    }
    // 表单的值发生变化
    onValueChange(e){
        let name  = e.target.name,
            value = e.target.value;
        this.setState({
            [name] : value
        });
    }
    // 提交
    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        // 分类名称不为空，提交数据
        if(categoryName){
            _film.saveCategory({
                parentId: this.state.parentId,
                categoryName: categoryName
            }).then((res) => {
                _vv.successTips(res);
                this.props.history.push('/film-category/index');
            }, (errMsg) => {
                _vv.errorTips(errMsg);
            });
        }
        // 否则，提示错误
        else{
            _vv.errorTips('请输入分类名称');
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="分类列表"/>
                <div className="row">
                     <div className="col-md-12">
                        <div className="form-horizontal">
                          <div className="form-group">
                                <label className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-5">
                                    <select name="parentId" 
                                            className="form-control"
                                            onChange={(e) => this.onValueChange(e)}>
                                        <option value="0">根分类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>根分类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                          </div>
                          <div className="form-group">
                                <label className="col-md-2 control-label">分类名称</label>
                                <div className="col-md-5">
                                  <input type="text" className="form-control" 
                                  placeholder="请输入分类名称"
                                  name="categoryName"
                                  value={this.state.name}
                                  onChange={(e) => this.onValueChange(e)}/>
                                </div>
                          </div>
                          <div className="form-group">
                            <div className="col-md-offset-2 col-md-10">
                              <button type="submit" className="btn btn-primary" 
                                onClick={(e) => {this.onSubmit(e)}}>提交</button>
                            </div>
                          </div>
                        </div>
                     </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd;
