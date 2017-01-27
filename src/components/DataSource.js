import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSourceValue } from '../actions'

class DataSource extends Component {
  render() {
    const { namespace, data, setSourceValue } = this.props
    console.log(data)
    return (
      <div>
        <h2>Data Namespace [{namespace}]</h2>
        <div>Paste some JSON!</div>
        <textarea
          onChange={(e) => {
            try {
              const value = JSON.parse(e.target.value)
              setSourceValue(namespace, value)
            } catch (e) {
              console.error('Bad JSON!')
            }
          }}
          style={{ height: '200px', width: '500px' }}
          value={JSON.stringify(data)}></textarea>
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  data: state.sources[ownProps.namespace] || {}
}), {
  setSourceValue
})(DataSource)
