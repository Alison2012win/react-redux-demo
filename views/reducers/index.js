const initialState = {
  selectedMenu: 1,
  currentTable: 1,
  menus: [{
    index: 0,
    name: '资源管理'
  },{
    index: 1,
    name: '字典管理'
  }],
  tables: [{
    type: 0,
    name: 'asset',
    url: '/api/assets',
    saveUrl: '/api/assets',
    deleteUrl: '/api/assets/',
    header: ['服务器名称', '服务器IP', '所属节点', '类型', '负责人', '状态', '应用部署信息', '操作'],
    colname: ['name', 'ip', 'parentNode', 'type', 'admin', 'state', 'appsInfo', 'aid'],
    item: []
  },{
    type: 1,
    searchOptions:[],
    name: 'dic',
    url: '/api/dics/total',
    saveUrl: '/api/dics',
    deleteUrl: '/api/dics/',
    header: ['字典类型', '字典码', '字典值', '操作'],
    colname: ['type', 'code', 'value', 'did'],
    item: []
  }],
  ifModal: false,
  modalType: 'new',
  selectDicTypes: [],
  modalShowData: {}
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
    case 'CHANGE_MODAL_TYPE':
      return Object.assign({}, state, {
        modalType: action.nextType,
        ifModal: true,
        modalShowData: action.data
      })
    default:
      return state
  }
}


