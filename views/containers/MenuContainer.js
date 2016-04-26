import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Menu from '../components/Menu'
import { changeMenu, getTableData } from '../actionCreators'

class MenuContainer extends Component {
  constructor(props) {
    super(props)
    this.changeMenu = this.changeMenu.bind(this)
  }

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

MenuContainer.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })),
  selectedMenu: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return { 
    menus: state.menus,
    selectedMenu: state.selectedMenu
  };
}

export default connect(mapStateToProps)(MenuContainer);
