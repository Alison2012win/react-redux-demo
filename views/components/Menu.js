import React, { Component, PropTypes } from 'react'

class Menu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { menus, selectedMenu, handleChange } = this.props
    const menusList = menus.map(menu => {
        return (
          <li className={menu.index == selectedMenu ? "treeview active" : "treeview"}>
            <a href="javascript:void(0);" onClick={() => handleChange(menu.index)}>
              <i className="fa fa-server"></i>{menu.name}
            </a>
          </li>
        )
      }
    );

    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu">
            {menusList}
          </ul>
        </section>
      </aside>
    )
  }
}

export default Menu;
