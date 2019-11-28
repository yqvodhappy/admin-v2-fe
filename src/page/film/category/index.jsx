/*
* @Author: Dtvikey
* @Date:   2019-11-28 04:46:02
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-28 09:35:59
*/


import React        from 'react';
import { Link }     from 'react-router-dom';
import VUtil        from 'util/vv.jsx'
import Film         from 'service/film-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

const _vv   = new VUtil();
const _film = new Film();

class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list                     : [],
            parentCategoryId         : this.props.match.params.categoryId || 0
        };
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps,prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            }, () => {
                this.loadCategoryList();
            });
        }
    }
    // 加载分类列表
    loadCategoryList(){
        _film.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list : res
            });
        }, errMsg => {
            this.setState({
                list : []
            });
            _vv.errorTips(errMsg);
        });
    }
    // 更新分类的名字
    onUpdateName(categoryId, categoryName){
        let newName = window.prompt('请输入新的分类名称',categoryName);
        if(newName){
            _film.updateCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then(res => {
                _vv.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _vv.errorTips(errMsg);
            });
        }
    }
    render(){
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                           onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                        {
                            category.parentId == 0 
                            ? <Link to={`/film-category/index/${category.id}`}>查看子分类</Link>
                            : null
                        }
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="分类列表">
                    <div className="page-header-right">
                        <Link to="/film-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加分类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                     <div className="col-md-12">
                          <p>父品类ID: {this.state.parentCategoryId}</p>
                     </div>
                </div>
                <TableList tableHeads={['分类ID', '分类名称', '操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

export default CategoryList;