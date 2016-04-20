import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="main-header">
        <span className="logo">
          <span className="logo-mini"><b>ITAM</b></span>
          <span className="logo-lg"><b>IT资产</b> 管理系统</span>
        </span>
        <nav className="navbar navbar-static-top">
          <a href="javascript:void(0);" className="sidebar-toggle" data-toggle="offcanvas"></a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user">
                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">
                  <span className="hidden-xs">aaa</span>
                  <span className="fa fa-cog"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href='/logout'>退出</a></li>         
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
