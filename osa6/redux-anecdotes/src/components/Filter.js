import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import {connect} from 'react-redux'

const Filter = ({ filterChange }) => {
  
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    filterChange(event.target.value)
  }
  const style = {
    marginBottom: 10
  }
  
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}

const ConnectedFilter = connect(() => ({}), mapDispatchToProps)(Filter)
export default ConnectedFilter
