import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTableData } from '../actionCreators'
import Table from '../components/Table'

class TableContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getTableData())
  }

  render() {
    const { tableData } = this.props
    return (
      <Table
        headerData={tableData.header}
        bodyData={tableData.item}
        colInfo={tableData.colname}
      />
    )
  }
}

export default connect()(TableContainer)
