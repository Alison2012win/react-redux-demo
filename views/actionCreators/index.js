import fetch from 'isomorphic-fetch'

function receiveTable(json, index) {
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

export function save(param) {
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

export function changeMenu(index) {
  return {
    type: 'CHANGE_MENU', 
    index: index
  }
}
