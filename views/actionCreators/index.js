import fetch from 'isomorphic-fetch'

export function receiveTable(json, index) {
  return {
    type: 'RECEIVE_TABLE_SUCCESS',
    data: json.result.data,
    index: index
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

export function getTableData(index) {
  return (dispatch, getState) => {
    fetchTableData(dispatch, getState, index);
  }
}

export function saveFetch(param) {
  return (dispatch, getState) => {
    const url = getState().tables[getState().currentTable].saveUrl
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
              alert(obj.msg);
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

export function changeMenu(index) {
  return {
    type: 'CHANGE_MENU', 
    index: index
  }
}

export function openModal() {
  return {
    type: 'OPEN_MODAL'
  }
}

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
