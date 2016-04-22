import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Menu from '../components/Menu'
import { changeMenu, getTableData } from '../actionCreators'

class MenuContainer extends Component {
  constructor(props) {
    super(props)
    this.changeMenu = this.changeMenu.bind(this)
  }

  // FIXME!!为什么在这里可以，但在changeMenu会报错
  /*componentDidMount() {
    const { dispatch } = this.props
    dispatch(changeMenu(0))
    dispatch(getTableData())
  }*/

  changeMenu(index) {
    const { dispatch } = this.props
    dispatch(getTableData(index))
    dispatch(changeMenu(index))
  }

  render() {
    const { menus, selectedMenu } = this.props
    return (
      <Menu 
        menus={menus}
        selectedMenu={selectedMenu}
        handleChange={this.changeMenu}
      />
    )
  }
}

function mapStateToProps(state) {
  return { 
    menus: state.menus,
    selectedMenu: state.selectedMenu
  };
}

export default connect(mapStateToProps)(MenuContainer);
