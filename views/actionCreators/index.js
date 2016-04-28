import fetch from 'isomorphic-fetch'

export function getTableData(index) {
  return (dispatch, getState) => {
    fetchTableData(dispatch, getState, index);
  }
}

/* 获取所有表数据 */
export function fetchTableData(dispatch, getState, index) {
  if(!index) {
    index = getState().currentTable;
  }
  const url = getState().tables[index].url
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveTable(json, index)))
}

/* 更新表数据 */
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

/* 改变modal框类型：新增or编辑 */
export function changeModalType(nextType, data) {
  return {
    type: 'CHANGE_MODAL_TYPE',
    nextType: nextType,
    data: data
  }
}
