import React, { Component } from 'react'
import SearchSelect from '../components/SearchSelect'
import Modal from '../components/Modal'
import { connect } from 'react-redux'
import { getTableData, saveFetch, deleteFetch } from '../actionCreators'
import Table from '../components/Table'

class Content extends Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getTableData(0))
  }

  openModal() {
    const { dispatch, currentTable } = this.props
    dispatch({type: 'OPEN_MODAL'})
  }

  closeModal() {
    const { dispatch } = this.props
    dispatch({type: 'CLOSE_MODAL'})
  }

  handleSave(params) {
    const { dispatch } = this.props
    dispatch(saveFetch(params))
  }

  handleDelete(id) {
    const { dispatch } = this.props
    dispatch(deleteFetch(id))
  }

  render() {
    const { selectedMenu, tableData, ifModal, currentTable } = this.props
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            ITAM
            <small><i className="fa fa-angle-double-right"></i>{selectedMenu.name}</small>
          </h1>
        </section>

        <section className="content">
          <div className="box">
            <div className="box-body">
              <form className="form-inline">
                  <SearchSelect />
                  <button className="btn btn-flat btn-info" type="button" >查询</button>
                  <button className="btn btn-flat btn-primary" type="button" >重置</button>
                  <button className="btn btn-flat btn-danger pull-right" type="button" onClick={this.openModal}>新增</button>
              </form>
              <Table
                tableData={tableData}
                handleDelete={this.handleDelete}
              />
            </div>
          </div>
        </section>

        <Modal 
          ifModal={ifModal}
          currentTable={currentTable}
          closeModal={this.closeModal}
          handleSave={this.handleSave}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    selectedMenu: state.menus[state.selectedMenu],
    tableData: state.tables[state.currentTable],
    ifModal: state.ifModal,
    currentTable: state.currentTable
  };
}

export default connect(mapStateToProps)(Content)
