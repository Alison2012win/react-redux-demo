import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTableData, saveFetch, deleteFetch } from '../actionCreators'
import Assets from '../components/pages/Assets'
import Dics from '../components/pages/Dics'

class Content extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getTableData(0))
  }

  render() {
    const { selectedMenu, tableData } = this.props
    switch (selectedMenu) {
      case 0:
        return (
          <div>
            <Assets 
              tableData={tableData}
            />
          </div>
        )
        break;
      case 1:
        return (
          <div>
            <Dics 
              tableData={tableData}
            />
          </div>
        )
        break;
      default:
        return (
          <span>Blank Page</span>
        )
        break;
    }
  }
}

function mapStateToProps(state) {
  return {
    selectedMenu:state.selectedMenu,
    tableData: state.tables[state.currentTable]
  };
}

export default connect(mapStateToProps)(Content)
