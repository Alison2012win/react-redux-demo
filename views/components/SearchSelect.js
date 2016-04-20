import React, { Component } from 'react'

class SearchSelect extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <select className="select2 form-control" style={{width: '15%'}}></select>
    )
  }
}

export default SearchSelect
