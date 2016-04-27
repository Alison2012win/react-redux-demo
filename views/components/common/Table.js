import React, { Component, PropTypes } from 'react'

class Table extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { tableData, handleDelete, handleModify, tableType } = this.props

    const headerHTML = tableData.header.map(item => {
      return (
        <th>{item}</th>
      )
    })
    
    const bodyHTML = tableData.item.map(item => {
      const tdHTML = tableData.colname.map(col => {
        if(tableData.colname.indexOf(col) == tableData.colname.length-1){
          switch (tableType) {
            case 'dic':
              return (
                <td>
                  <a onClick={() => handleModify(item)}>编辑&nbsp;</a>
                  <a onClick={() => handleDelete(item[col])}>删除</a>
                </td>
              )
          }
        } else {
          return (
            <td>{item[col]}</td>
          )
        }
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

Table.propTypes = {
  tableData: PropTypes.object.isRequired
};

export default Table;
