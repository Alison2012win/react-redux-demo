import fetch from 'isomorphic-fetch'

/* 新增、修改 */
export function saveFetch(param, id) {
  return (dispatch, getState) => {
    const modalType = getState().modalType
    let url = ''
    if(modalType == 'new'){
      url = getState().tables[getState().currentTable].saveUrl
    } else if(modalType == 'edit'){
      url = getState().tables[getState().currentTable].saveUrl + '/' + id
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
              fetchTableData(dispatch, getState);
              dispatch({type: 'CLOSE_MODAL'});
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
    const url = getState().tables[getState().currentTable].deleteUrl + id
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
              fetchTableData(dispatch, getState);
            }
          })
        } else {
          alert('错误代码： ' + res.status)
        }        
      });
  }
}

/* 获取所有 */
export function getTableData(index) {
  return (dispatch, getState) => {
    fetchTableData(dispatch, getState, index);
  }
}

function fetchTableData(dispatch, getState, index) {
  if(!index) {
    index = getState().currentTable;
  }
  const url = getState().tables[index].url
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveTable(json, index)))
}

export function receiveTable(json, index) {
  return {
    type: 'RECEIVE_TABLE_SUCCESS',
    data: json.result.data,
    index: index
  }
}

/* 改变菜单 */
export function changeMenu(index) {
  return {
    type: 'CHANGE_MENU', 
    index: index
  }
}

/* 打开modal框 */
export function openModal() {
  return {
    type: 'OPEN_MODAL'
  }
}

/* 关闭modal框 */
export function closeModal() {
  return {
    type: 'CLOSE_MODAL'
  }
}


export function organizeDicTypeSelect() {
  return (dispatch ) => {
    return getDicTypeSelect(dispatch)
  }
}

/* 获取字典类型下拉数据 */
function getDicTypeSelect(dispatch){
  fetch('api/dics/total')
    .then(response => response.json())
    .then(json => {
      if(json.code == 1){
        dispatch(updateDicTypeSelectOptions(json.result.data))
      }else {
        alert('获取下拉选项失败！')
      }
    })
}

function updateDicTypeSelectOptions(data){
  const typeArray = ['所有类型'];
  data.map(item => {
    if(typeArray.indexOf(item.type) < 0 ){
      typeArray.push(item.type);
    }
  })
  return {
    type: 'DIC_SELECT_TYPE',
    data: typeArray
  }
}

/* 改变modal框类型：新增or编辑 */
export function changeModalType(nextType, data) {
  return {
    type: 'CHANGE_MODAL_TYPE',
    nextType: nextType,
    data: data
  }
}
