import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actionCreators'
import SearchSelect from '../common/SearchSelect'
import Modal from '../common/Modal'
import Table from '../common/Table'

class Assets extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { tableData, currentTable, actions } = this.props
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            ITAM
            <small><i className="fa fa-angle-double-right"></i>资产管理</small>
          </h1>
        </section>

        <section className="content">
          <div className="box">
            <div className="box-body">
              <form className="form-inline">
                  <button className="btn btn-flat btn-info" type="button" >查询</button>
                  <button className="btn btn-flat btn-primary" type="button" >重置</button>
                  <button className="btn btn-flat btn-danger pull-right" 
                    type="button">新增</button>
              </form>
              <Table
                tableData={tableData}
                handleDelete={() => actions.deleteFetch()}
              />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTable: state.currentTable
  }
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assets)
