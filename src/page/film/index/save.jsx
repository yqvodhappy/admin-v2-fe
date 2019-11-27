/*
* @Author: Dtvikey
* @Date:   2019-11-25 19:54:54
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-27 20:22:53
*/

import React              from 'react';
import VUtil              from 'util/vv.jsx';
import Film               from 'service/film-service.jsx';
import PageTitle          from 'component/page-title/index.jsx';
import CategorySelector   from './category-selector.jsx';
import FileUploader       from 'util/file-uploader/index.jsx';
import RichEditor       from 'util/rich-editor/index.jsx';

import './save.scss';

const  _vv   = new VUtil();
const  _film = new Film();

class FilmSave extends React.Component{
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
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    // 简单字段的改变，如主标题，副标题...
    onValueChange(e){
        let name  = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });

    }
    // 分类选择器变化
    onCategoryChange(categoryId, parentCategoryId){
       this.setState({
           categoryId       : categoryId,
           parentCategoryId : parentCategoryId
       });
    }
    // 上传图片成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages : subImages
        });
    }
    // 上传图片失败
    onUploadError(errMsg){
        _vv.errorTips(errMsg);
    }
    // 删除图片
    onImageDelete(e){
        let index     = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages : subImages
        });
    }
    // 富文本编辑器的变化
    onDetailValueChange(value){
        this.setState({
            detail: value
        });
    }
    // 处理subImages
    getSubImagesString(){
       return this.state.subImages.map((image) => image.uri).join(',');
    }
    // 提交表单
    onSubmit(){
       let film = {
           name       : this.state.name,
           subtitle   : this.state.subtitle,
           categoryId : parseInt(this.state.categoryId),
           subImages  : this.getSubImagesString(),
           detail     : this.state.detail,
           filmUrl    : this.state.filmUrl,
           source     : this.state.source,
           count      : parseInt(this.state.count),
           status     : this.state.status
       },
       filmCheckResult = _film.checkFilm(film);
       if(this.state.id){
           film.id = this.state.id;
       }
        // 表单验证成功
        if(filmCheckResult.status){
            _film.saveFilm(film).then((res) => {
                _vv.successTips(res);
                this.props.history.push('/film/index');
            }, (errMsg) => {
                _vv.errorTips(errMsg);
            });
        }
        // 表单验证失败
        else{
            _vv.errorTips(filmCheckResult.msg);
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
                              <input type="text" className="form-control" 
                              placeholder="请输入影片主标题"
                              name="name"
                              value={this.state.name}
                              onChange={(e) => this.onValueChange(e)}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片副标题</label>
                            <div className="col-md-5">
                              <input type="text" className="form-control" 
                                     placeholder="请输入影片副标题"
                                     name="subtitle"
                                     value={this.state.subtitle}
                                     onChange={(e) => this.onValueChange(e)}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">所属分类</label>
                            <CategorySelector 
                              categoryId={this.state.categoryId}
                              parentCategoryId={this.state.parentCategoryId}
                              onCategoryChange={
                              (categoryId,parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}/>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片地址</label>
                            <div className="col-md-5">
                              <input type="text" className="form-control" 
                                     placeholder="影片Url地址"
                                     name="filmUrl"
                                     value={this.state.filmUrl}
                                     onChange={(e) => this.onValueChange(e)}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片来源</label>
                            <div className="col-md-3">
                              <input type="text" className="form-control" 
                                     placeholder="影片来源"
                                     name="source"
                                     value={this.state.source}
                                     onChange={(e) => this.onValueChange(e)}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片热度</label>
                            <div className="col-md-3">
                              <div className="input-group">
                                <input type="number" className="form-control" 
                                        placeholder="点击"
                                        name="count"
                                        value={this.state.count}
                                        onChange={(e) => this.onValueChange(e)}/>
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
                                            <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                                        </div>)
                                  ) : (<div>请上传图片</div>)
                              }
                            </div>
                            <div className="col-md-offset-2 col-md-10 file-upload-con">
                              <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                  onError={(errMsg) => this.onUploadError(errMsg)}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-2 control-label">影片详情</label>
                            <div className="col-md-10">
                              <RichEditor 
                                    detail={this.state.detail}
                                    defaultDetail={this.state.defaultDetail}
                                    onValueChange={(value) => this.onDetailValueChange(value)}/>
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
        )
    }
}

export default FilmSave;
