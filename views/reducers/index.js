const initialState = {
  selectedMenu: 1,
  menus: [{
    index: 0,
    name: '资源管理'
  },{
    index: 1,
    name: '字典管理'
  }],
  currentTable: 1,
  tables: [{
    type: 0,
    name: 'asset',
    url: '/api/assets',
    params: {},
    header: ['服务器名称', '服务器IP', '所属节点', '类型', '负责人', '状态', '应用部署信息', '操作'],
    colname: ['name', 'ip', 'parentNode', 'type', 'admin', 'state', 'appsInfo', 'aid'],
    item: []
  },{
    type: 1,
    name: 'dic',
    url: '/api/dics/total',
    params: {},
    header: ['字典类型', '字典码', '字典值', '操作'],
    colname: ['type', 'code', 'value', 'did'],
    item: []
  }],
  ifModal: false
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_TABLE_SUCCESS':
      return Object.assign({}, state, {
        tables: [
          ...state.tables.slice(0, state.currentTable),
          Object.assign({}, state.tables[state.currentTable], {
            item: action.data
          }),
          ...state.tables.slice(state.currentTable + 1)
        ]
      })
    case 'CHANGE_MENU':
      return Object.assign({}, state, {
        selectedMenu: action.index,
        currentTable: action.index
      })
    case 'OPEN_MODAL':
      return Object.assign({}, state, {
        ifModal: true
      })
    case 'CLOSE_MODAL':
      return Object.assign({}, state, {
        ifModal: false
      })
    default:
      return state
  }
}


