import React, { Component } from 'react'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <footer className="main-footer" style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <strong>&copy; 2014-2015 </strong> 万达信息股份有限公司
      </footer>
    )
  }
}

export default Footer
