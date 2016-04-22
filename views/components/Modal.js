import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.organizeParams = this.organizeParams.bind(this)
  }

  organizeParams(){
    const { handleSave } = this.props
    const type = ReactDOM.findDOMNode(this.refs.dicType).value
    const code = ReactDOM.findDOMNode(this.refs.dicCode).value
    const value = ReactDOM.findDOMNode(this.refs.dicValue).value
    handleSave("type=" + type + "&code=" + code + "&value=" + value)
  }

  render() {
    const { ifModal, closeModal } = this.props
    return (
      <div>
        <div className="modal modal-danger" tabIndex="-1" style={{display: ifModal ? 'block' : 'none'}}>
          <div className="modal-dialog" style={{width: '500px'}}>
            <div className="modal-content">

              <form method="post" action="api/dics" className="form-horizontal">
                <div className="modal-header">
                  <button type="button" className="close" onClick={closeModal}>&times;</button>
                  <h4 className="modal-title" id="dic-modal-title">新增字典</h4>
                </div>

                <div className="box-body">
                  <div className="form-group">
                    <label className="col-sm-4 control-label">字典类型（必填）</label>
                    <div className="col-sm-6">
                      <input ref="dicType" className="form-control" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">字典码（必填）</label>
                    <div className="col-sm-6">
                      <input ref="dicCode" className="form-control" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">字典值（必填）</label>
                    <div className="col-sm-6">
                      <input ref="dicValue" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-outline btn-sm" onClick={closeModal}>取消</button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={this.organizeParams}>保存</button>
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

export default Modal
