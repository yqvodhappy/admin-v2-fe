/*
* @Author: Dtvikey
* @Date:   2019-11-25 09:28:56
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-26 06:10:23
*/


import React        from 'react';
import { Link }     from 'react-router-dom';
import VUtil        from 'util/vv.jsx';
import Film         from 'service/film-service.jsx';

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';

import './index.scss';

const  _vv   = new VUtil();
const  _film = new Film();

class FilmList extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                list            : [],
                pageNum         : 1,
                listType        : 'list'
            };
        }
        componentDidMount(){
            this.loadFilmList();
        }
        // 加载影片列表
        loadFilmList(){
            let listParam = {};
            listParam.listType = this.state.listType;
            listParam.pageNum  = this.state.pageNum;
            // 如果是搜索的话，需要传入搜索类型和搜索关键字
            if (this.state.listType === 'search') {
                listParam.searchType = this.state.searchType;
                listParam.keyword    = this.state.searchKeyword;
            }
            // 请求接口
            _film.getFilmList(listParam).then(res => {
                this.setState(res);
            }, errMsg => {
                this.setState({
                    list : []
                });
                _vv.errorTips(errMsg);
            });
        }
        // 搜索
        onSearch(searchType, searchKeyword){
            let listType = searchKeyword === '' ? 'list' : 'search'
            this.setState({
                listType        : listType,
                pageNum         : 1,
                searchType      : searchType,
                searchKeyword   : searchKeyword
            },() => {
                this.loadFilmList();
            });
        }
        // 页数发生变化的时候
        onPageNumChange(pageNum){
            this.setState({
                pageNum : pageNum
            }, () => {
                this.loadFilmList();
            });
        }
        // 改变商品状态，上架 / 下架
        onSetFilmStatus(e, filmId, currentStatus){
            let newStatus   = currentStatus == 1 ? 2 : 1,
                confrimTips = currentStatus == 1 
                    ? '确定要下线该影片？' : '确定要上架该影片？';
            if(window.confirm(confrimTips)){
                _film.setFilmStatus({
                    filmId: filmId,
                    status: newStatus
                }).then(res => {
                    _vv.successTips(res);
                    this.loadFilmList();
                }, errMsg => {
                    _vv.errorTips(res);
                });
            }
        }
        render(){
            let tableHeads = [
            {name: '影片ID', width: '10%'},
            {name: '影片主标题', width: '50%'},
            {name: '影片点击数', width: '10%'},
            {name: '状态', width: '15%'},
            {name: '操作', width: '15%'},
            ];
            return (
                <div id="page-wrapper">
                    <PageTitle title="影片列表">
                        <div className="page-header-right">
                            <Link to="/film/save" className="btn btn-primary">
                                <i className="fa fa-plus"></i>
                                <span>添加影片</span>
                            </Link>
                        </div>
                    </PageTitle>
                      <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                      <TableList tableHeads={tableHeads}>
                          {
                            this.state.list.map((film, index) => {
                            return (
                                <tr key={index}>
                                    <td>{film.id}</td>
                                    <td>{film.name}</td>
                                    <td>{film.count}</td>
                                    <td>
                                        <p>{film.status == 1 ? '在线' : '已下线'}</p>
                                        <button className="btn btn-xs btn-warning" 
                                            onClick={(e) => {this.onSetFilmStatus(e, film.id, film.status)}}>{film.status == 1 ? '下线' : '上线'}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={ `/film/detail/${film.id}` }>详情</Link>
                                        <Link className="opear" to={ `/film/save/${film.id}` }>编辑</Link>
                                    </td>
                                </tr>
                                );
                            })
                          }
                      </TableList>
                     <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
                </div>
            );
    }
}


export default FilmList;