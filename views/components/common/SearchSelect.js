import React, { Component } from 'react'

class SearchSelect extends Component {
  constructor(props) {
    super(props)
  }

  render() {
  	const { data } = this.props
  	const optionsHTML = data.map(item => {
  	  if(data.indexOf(item) == 0){
  	  	return (
	  	    <option value="">{item}</option>
	  	  )
  	  } else {
  	  	return (
  	  	  <option value={item}>{item}</option>
  	  	)
  	  }
  	})
    return (
      <select className="select2 form-control" style={{width: '15%'}}>
      	{optionsHTML}
      </select>
    )
  }
}

export default SearchSelect
