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
    saveUrl: '/api/assets',
    deleteUrl: '/api/assets/',
    params: {},
    header: ['服务器名称', '服务器IP', '所属节点', '类型', '负责人', '状态', '应用部署信息', '操作'],
    colname: ['name', 'ip', 'parentNode', 'type', 'admin', 'state', 'appsInfo', 'aid'],
    item: [],
    options: [{
      type: '更新状态'
    }, {
      type: '详情'
    }, {
      type: '编辑'
    }, {
      type: '删除'
    }]
  },{
    type: 1,
    searchOptions:[],
    name: 'dic',
    url: '/api/dics/total',
    saveUrl: '/api/dics',
    deleteUrl: '/api/dics/',
    params: {},
    header: ['字典类型', '字典码', '字典值', '操作'],
    colname: ['type', 'code', 'value', 'did'],
    item: [],
    options: [{
      type: '编辑'
    }, {
      type: '删除'
    }]
  }],
  ifModal: false,
  modalType: 'new',
  selectDicTypes: []
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_TABLE_SUCCESS':
      const index = action.index;
      return Object.assign({}, state, {
        tables: [
          ...state.tables.slice(0, index),
          Object.assign({}, state.tables[index], {
            item: action.data
          }),
          ...state.tables.slice(index + 1)
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
    case 'DIC_SELECT_TYPE':
      return Object.assign({}, state, {
        selectDicTypes: action.data
      })
    default:
      return state
  }
}


