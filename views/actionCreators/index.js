import fetch from 'isomorphic-fetch'

function receiveTable(json) {
  return {
    type: 'RECEIVE_TABLE_SUCCESS',
    data: json.result.data
  }
}

export function getTableData() {
  return (dispatch, getState) => {
    const url = getState().tables[getState().currentTable].url
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveTable(json)))
  }
}

export function changeMenu(index) {
  return {
    type: 'CHANGE_MENU',
    index: index
  }
}
