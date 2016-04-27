import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class DicModal extends Component {
  constructor(props) {
    super(props)
    this.organizeDicParams = this.organizeDicParams.bind(this)
  }

  organizeDicParams(){
    const { handleSave } = this.props
    const id = ReactDOM.findDOMNode(this.refs.dicId).value
    const type = ReactDOM.findDOMNode(this.refs.dicType).value
    const code = ReactDOM.findDOMNode(this.refs.dicCode).value
    const value = ReactDOM.findDOMNode(this.refs.dicValue).value
    handleSave("type=" + type + "&code=" + code + "&value=" + value, id)
  }

  render() {
    const { ifModal, closeModal, modalType, showData } = this.props
    return (
        <div>
          <div className="modal modal-danger" tabIndex="-1" style={{display: ifModal ? 'block' : 'none'}}>
            <div className="modal-dialog" style={{width: '500px'}}>
              <div className="modal-content">

                <form method="post" action="api/dics" className="form-horizontal">
                  <input ref="dicId" hidden value={modalType == 'new' ? '' : showData.did} />

                  <div className="modal-header">
                    <button type="button" className="close" onClick={closeModal}>&times;</button>
                    <h4 className="modal-title">{modalType == 'new' ? '新增字典' : '编辑字典'}</h4>
                  </div>
  
                  <div className="box-body">
                    <div className="form-group">
                      <label className="col-sm-4 control-label">字典类型（必填）</label>
                      <div className="col-sm-6">
                        <input ref="dicType" className="form-control" disabled={modalType == 'new' ? '' : 'disabled'} value={modalType == 'new' ? null : showData.type} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-4 control-label">字典码（必填）</label>
                      <div className="col-sm-6">
                        <input ref="dicCode" className="form-control" disabled={modalType == 'new' ? '' : 'disabled'} value={modalType == 'new' ? null : showData.code} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-4 control-label">字典值（必填）</label>
                      <div className="col-sm-6">
                        <input ref="dicValue" className="form-control" value={modalType == 'new' ? null : showData.value} />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline btn-sm" onClick={closeModal}>取消</button>
                    <button type="button" className="btn btn-outline btn-sm" 
                      onClick={this.organizeDicParams}>保存</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-backdrop in" style={{display: ifModal ? 'block' : 'none'}}></div>
        </div>
      )
  }
}

export default DicModal
