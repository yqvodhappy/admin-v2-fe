/*
* @Author: Dtvikey
* @Date:   2019-11-27 20:16:03
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-27 20:42:16
*/


import React              from 'react';
import VUtil              from 'util/vv.jsx';
import Film               from 'service/film-service.jsx';
import PageTitle          from 'component/page-title/index.jsx';
import CategorySelector   from './category-selector.jsx';

import './save.scss';

const  _vv   = new VUtil();
const  _film = new Film();

class FilmDetail extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          id               : this.props.match.params.fid,
          name             : '',
          subtitle         : '',
          categoryId       : 0,
          parentCategoryId : 0,
          subImages        : [],
          filmUrl          : '',
          source           : '温州网',
          count            : '',
          detail           : '',
          status           : 1 //影片状态1为在线
      }
    }
    // 组件完成加载
    componentDidMount(){
        this.loadFilm();
    }
    // 加载影片详情
    loadFilm(){
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id){
            _film.getFilm(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render(){
        return (
              <div id="page-wrapper">
                    <PageTitle title="添加影片" />
                    <div className="form-horizontal">
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片主标题</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.name}</p>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片副标题</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.subtitle}</p>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">所属分类</label>
                            <CategorySelector 
                              readOnly
                              categoryId={this.state.categoryId}
                              parentCategoryId={this.state.parentCategoryId}/>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片地址</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.filmUrl}</p>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片来源</label>
                            <div className="col-md-3">
                                <p className="form-control-static">{this.state.source}</p>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片热度</label>
                            <div className="col-md-3">
                              <div className="input-group">
                                <input type="number" className="form-control" 
                                        value={this.state.count} readOnly/>
                                <span className="input-group-addon">次</span>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片图片</label>
                            <div className="col-md-10">
                              {
                                  this.state.subImages.length ? this.state.subImages.map(
                                      (image, index) => (
                                        <div className="img-con" key={index} >
                                            <img className="img" src={image.url}/>
                                        </div>)
                                  ) : (<div>暂无图片</div>)
                              }
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片详情</label>
                            <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                          </div>
                    </div>
              </div>
        )
    }
}

export default FilmDetail;

