import React, { Component } from 'react'
import TableContainer from './TableContainer'
import SearchSelect from '../components/SearchSelect'
import Modal from '../components/Modal'
import { connect } from 'react-redux'

class Content extends Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  openModal() {
    const { dispatch } = this.props
    dispatch({type: 'OPEN_MODAL'})
  }

  closeModal() {
    const { dispatch } = this.props
    dispatch({type: 'CLOSE_MODAL'})
  }

  handleSave() {
    const { dispatch } = this.props
    dispatch({
      type: 'SAVE',
      params: {
        
      }
    })
  }

  render() {
    const { selectedMenu, tableData, ifModal } = this.props
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
              <TableContainer 
                tableData={tableData}
                handleSave={this.handleSave}
              />
            </div>
          </div>
        </section>

        <Modal 
          ifModal={ifModal}
          closeModal={this.closeModal}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    selectedMenu: state.menus[state.selectedMenu],
    tableData: state.tables[state.currentTable],
    ifModal: state.ifModal
  };
}

export default connect(mapStateToProps)(Content)
