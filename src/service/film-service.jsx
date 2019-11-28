/*
* @Author: Dtvikey
* @Date:   2019-11-25 09:38:55
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-28 09:40:11
*/


import VUtil from 'util/vv.jsx';

const  _vv   = new VUtil();

class Film{
    // 获取影片列表
    getFilmList(listParam){
        let url   = '',
            data  = {};
        if (listParam.listType === 'list') {
            url                         = '/manage/film/list.do';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url                         = '/manage/film/search.do';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }

        return _vv.request({
            type : 'post',
            url  : url,
            data : data
       });
    }
    // 获取影片详情
    getFilm(filmId){
        return _vv.request({
            type    : 'post',
            url     : '/manage/film/detail.do',
            data    : {
                filmId : filmId || 0
            }
        });
    }
    // 变更影片在线状态
    setFilmStatus(filmInfo){
        return _vv.request({
            type    : 'post',
            url     : '/manage/film/set_sale_status.do',
            data    : filmInfo
        });
    }
    // 检查保存商品的表单数据
    checkFilm(film){
       
        let result = {
            status : true,
            msg    : '验证通过'
        };

        // 判断影片主标题为空
        if(typeof film.name !== 'string' || film.name.length === 0){
            return{
                status: false,
                msg: '影片主标题不能为空!'
            }
        }
        // 判断影片副标题为空
        if(typeof film.subtitle !== 'string' || film.subtitle.length === 0){
            return{
                status: false,
                msg: '影片副标题不能为空!'
            }
        }
        // 验证分类ID
        if(typeof film.categoryId !== 'number' || !(film.categoryId > 0)){
            return {
                status: false,
                msg: '请选择影片分类！'
            }
        }
        // 判断影片URL地址为空
        if(typeof film.filmUrl !== 'string' || film.filmUrl.length === 0){
            return{
                status: false,
                msg: '影片URL地址不能为空!'
            }
        }
        // 判断影片来源为空
        if(typeof film.source !== 'string' || film.source.length === 0){
            return{
                status: false,
                msg: '影片来源不能为空!'
            }
        }
        // 判断影片点击次数为数字，且大于或等于0
        if(typeof film.count !== 'number' || !(film.count >= 0)){
            return{
                status: false,
                msg: '请输入正确的点击次数!'
            }
        }

        return result;
    }
    // 保存商品
    saveFilm(film){
        return _vv.request({
            type    : 'post',
            url     : '/manage/film/save.do',
            data    : film
        });
    }
    // 根据父分类id获取分类列表
    getCategoryList(parentCategoryId){
        return _vv.request({
            type    : 'post',
            url     : '/manage/category/get_category.do',
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    // 新增分类
    saveCategory(category){
        return _vv.request({
            type    : 'post',
            url     : '/manage/category/add_category.do',
            data    : category
        });
    }
    // 修改分类名称
    updateCategoryName(category){
        return _vv.request({
            type    : 'post',
            url     : '/manage/category/set_category_name.do',
            data    : category
        });
    }
}

export default Film;