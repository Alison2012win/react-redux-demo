import React, { Component } from 'react'

class Table extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { headerData, bodyData, colInfo } = this.props
    const headerHTML = headerData.map(item => {
      return (
        <th>{item}</th>
      )
    })
    
    const bodyHTML = bodyData.map(item => {
      const tdHTML = colInfo.map(col => {
        return (
          <td>{item[col]}</td>
        )
      })
      return (
        <tr role="row" className="odd">
          {tdHTML}
        </tr>
      )
    })

    return (
      <table className="table table-bordered table-hover table-striped">
        <thead style={{backgroundColor: '#ededed'}}>
          <tr className='test'>
            {headerHTML}
          </tr>
        </thead>
        <tbody>
          {bodyHTML}
        </tbody>
      </table>
    )
  }
}

export default Table;
