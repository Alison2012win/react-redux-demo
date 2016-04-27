import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actionCreators'
import SearchSelect from '../common/SearchSelect'
import DicModal from './DicModal'
import Table from '../common/Table'

class Assets extends Component {
  constructor(props) {
    super(props)
    this.searchDicTable = this.searchDicTable.bind(this)
    this.handleModify = this.handleModify.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount() {
    const { actions } = this.props
    actions.organizeDicTypeSelect()
  }

  searchDicTable(){
    const { actions } = this.props
    fetch('api/dics?type=' + ReactDOM.findDOMNode(this.refs.dicType).value )
      .then(response => response.json())
      .then(json => actions.receiveTable(json, 1))
  }

  handleModify(data){
    const { actions } = this.props
    actions.changeModalType('edit', data);
  }

  handleAdd(){
    const { actions } = this.props
    actions.changeModalType('new', {});
  }

  render() {
    const { tableData, ifModal, modalType, actions, selectDicTypes, modalShowData } = this.props
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            ITAM
            <small><i className="fa fa-angle-double-right"></i>字典管理</small>
          </h1>
        </section>

        <section className="content">
          <div className="box">
            <div className="box-body">
              <form className="form-inline">
                  <SearchSelect ref="dicType" data={selectDicTypes}/>
                  <button className="btn btn-flat btn-info" type="button" onClick={this.searchDicTable}>查询</button>
                  <button className="btn btn-flat btn-primary" type="reset">重置</button>
                  <button className="btn btn-flat btn-danger pull-right" 
                    type="button" onClick={this.handleAdd}>新增</button>
              </form>
              <Table
                tableData={tableData}
                handleDelete={id => actions.deleteFetch(id)}
                handleModify={this.handleModify}
                tableType="dic"
              />
            </div>
          </div>
        </section>

        <DicModal
          ifModal={ifModal}
          modalType={modalType}
          showData={modalShowData}
          closeModal={() => actions.closeModal()}
          handleSave={(params, id) => actions.saveFetch(params, id)}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ifModal: state.ifModal,
    selectDicTypes: state.selectDicTypes,
    modalType: state.modalType,
    modalShowData: state.modalShowData
  }
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assets)
