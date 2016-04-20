import fetch from 'isomorphic-fetch'

function receiveTable(json) {
  console.log('receiveTable')
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

export function save() {
  return (dispatch, getState) => {
    const url = getState().tables[getState().currentTable].saveUrl
    return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: ""
      })
      .then(function(response) {
        response.text().then(function(obj) {
           console.log(obj)
        })
          
      });

  }
}

export function changeMenu(index) {
  return {
    type: 'CHANGE_MENU',
    index: index
  }
}
