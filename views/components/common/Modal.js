import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DicModal from '../pages/DicModal'

class Modal extends Component {
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
    const { ifModal, closeModal, currentTable, modalType, showData } = this.props
    if(currentTable == 1) {
      return (
        <div>
          <
        </div>
      )
    } else {
      return (
        <span></span>
      )
    }
  }
}

export default Modal
