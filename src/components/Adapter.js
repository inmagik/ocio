import React from 'react'
import { connect } from 'react-redux'
import { setAdapterValue } from '../actions'
import { get } from 'lodash'
import mapper from '../mapper'

const ScalarField = ({ field, value, setValue }) => (
  <div style={{ padding: '5px' }}>
   <div>{field}</div>
   <div>{value}</div>
   <input value={value} onChange={(e) => setValue(field, e.target.value)} />
  </div>
)

const generateProps = (values, instructions, sources) => {
  return Object.keys(instructions.fields).reduce((result, field) => {
    const fieldConf = instructions.fields[field]
    // Simply sclare got the value
    if (fieldConf.type === 'SCALAR') {
      return { ...result, [field]: values[field] }
    } else if (fieldConf.type === 'MAPPER') {
      const mapResult = mapper(fieldConf.mapper.type)(sources['cities'], values[field] || {})
      return { ...result, [field]: mapResult }
    }
  }, {})
}

const Adapter = (WrappedComponent, instructions) => {

  const AdaptComponent = ({ namespace, setAdapterValue, localValues, sources }) => {

    const setValue = (field, value) => setAdapterValue(namespace, field, value)
    const wrappedProps = generateProps(localValues, instructions, sources)
    console.log(wrappedProps)
    // console.info(localValues, instructions, generateProps(localValues, instructions, sources))

    return (
      <div>
        {/* Input rendering */}
        {Object.keys(instructions.fields).map(field => {
          const fieldConf = instructions.fields[field]
          if (fieldConf.type === 'SCALAR') {
            return <ScalarField
              field={field}
              value={localValues[field] || ''}
              setValue={setValue}
              key={field}
            />
          } else if (fieldConf.type === 'MAPPER') {
            return <div key={field}>
                 {Object.keys(fieldConf.mapper.fields).map(mapperField => (
                    <ScalarField
                      field={`${field}.${mapperField}`}
                      value={get(localValues, `${field}.${mapperField}`, '')}
                      setValue={setValue}
                      key={`${field}.${mapperField}`}
                    />
                 ))}
              </div>
          }
        })}

        {/* {typeof wrappedProps.data !== 'undefined' &&  <WrappedComponent {...wrappedProps} />} */}
      </div>
    )
  }

  function mapStateToProps(state, ownProps) {
    return {
      localValues: state.adapters[ownProps.namespace] || {}, // <--- Related to adapter
      sources: state.sources,
    }
  }

  return connect(mapStateToProps, {
    setAdapterValue
  })(AdaptComponent)
}

export default Adapter
