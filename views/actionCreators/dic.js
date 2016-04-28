import * as commonActions from './index'
import fetch from 'isomorphic-fetch'

/* 新增、修改 */
export function saveDic(param, id) {
  return (dispatch, getState) => {
    const modalType = getState().modalType
    let url = ''
    if(modalType == 'new'){
      url = '/api/dics'
    } else if(modalType == 'edit'){
      url = '/api/dics/' + id
    }
    return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: param
      }).then(function(response) {
        if(response.ok){
          response.json().then(function(obj) {
            if(obj.code == -1){
              alert('保存出错： ' + obj.msg.message);
            } else {
              alert('保存成功!');
              getDicTypeSelect(dispatch);
              commonActions.fetchTableData(dispatch, getState);
              dispatch(commonActions.closeModal());
            }
          })
        } else {
          alert('错误代码： ' + res.status)
        }        
      });
  }
}

/* 删除 */
export function deleteFetch(id) {
  return (dispatch, getState) => {
    const url = '/api/dics/' + id
    return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }).then(function(response) {
        if(response.ok){
          response.json().then(function(obj) {
            if(obj.code == -1){
              alert(obj.msg);
            } else {
              alert('删除成功!');
              getDicTypeSelect(dispatch);
              commonActions.fetchTableData(dispatch, getState);
            }
          })
        } else {
          alert('错误代码： ' + res.status)
        }        
      });
  }
}

/* 查询 */
export function searchDicTable(type) {
  return (dispatch ) => {
    fetch('api/dics?type=' + type )
      .then(response => response.json())
      .then(json => dispatch(commonActions.receiveTable(json, 1)))
  }
}

/* 获取字典类型下拉数据 */
export function organizeDicTypeSelect() {
  return (dispatch ) => {
    return getDicTypeSelect(dispatch)
  }
}
function getDicTypeSelect(dispatch){
  fetch('api/dics/total')
    .then(response => response.json())
    .then(json => {
      if(json.code == 1){
        const typeArray = ['所有类型'];
        json.result.data.map(item => {
          if(typeArray.indexOf(item.type) < 0 ){
            typeArray.push(item.type);
          }
        })
        dispatch(updateDicTypeSelectOptions(typeArray))
      }else {
        alert('获取下拉选项失败！')
      }
    })
}
function updateDicTypeSelectOptions(data){
  return {
    type: 'DIC_SELECT_TYPE',
    data: data
  }
}