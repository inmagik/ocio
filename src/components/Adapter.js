import React from 'react'
import { connect } from 'react-redux'
import { Either } from 'ramda-fantasy'
import { get } from 'lodash'
import { identity, find } from 'ramda'
import { setAdapterValue } from '../actions'
import generateProps from '../props'

const ScalarField = ({ field, fieldConf, localValues, globalValues, setValue }) => {
  const value = get(localValues, field, '')
  return (
    <div style={{ padding: '5px' }}>
      <div>{field}</div>
      <div>{value}</div>
      <input value={value} onChange={(e) => setValue(field, e.target.value)} />
    </div>
  )
}

const MapperField = ({ field, fieldConf, localValues, globalValues, setValue }) => (
  <div key={field}>
    <select onChange={(e) => setValue(`${field}.key`, e.target.value)}>
      <option key={'----'}>----</option>
      {Object.keys(globalValues).map(key => (
        <option value={key} key={key}>{key}</option>
      ))}
    </select>
    {Object.keys(fieldConf.mapper.fields).map(mapperField => (
      <ScalarField
        key={`${field}.args.${mapperField}`}
        field={`${field}.args.${mapperField}`}
        localValues={localValues}
        globalValues={globalValues}
        setValue={setValue}
      />
   ))}
  </div>
)

const Field = (props) => {
  if (props.fieldConf.type === 'SCALAR') {
    return <ScalarField {...props} />
  } else if (props.fieldConf.type === 'MAPPER') {
    return <MapperField {...props} />
  } else {
    return <div>Bad Conf....</div>
  }
}

const Adapter = (WrappedComponent, instructions) => {

  const AdaptComponent = ({ namespace, setAdapterValue, localValues, sources, wrappedProps, error }) => {

    const setValue = (field, value) => setAdapterValue(namespace, field, value)

    return (
      <div style={{ border: '1px solid deepskyblue', padding: '5px' }}>
        <h4>WRAP NAMESPACE [{namespace}]</h4>
        {/* Input rendering for adapter */}
        <div className="adapter-inputs">
          {Object.keys(instructions.fields).map(field => (
            <Field
              key={field}
              field={field}
              fieldConf={instructions.fields[field]}
              localValues={localValues}
              globalValues={sources}
              setValue={setValue}
            />
          ))}
        </div>
        {/* Rendering of WrappedComponent */}
        {error && (
          <div style={{ color: 'red' }}>Bad Inputs: {error.message}</div>
        )}
        {wrappedProps && (
          <div style={{ border: '1px solid green', padding: '5px' }}>
            <WrappedComponent {...wrappedProps} />
          </div>
        )}
      </div>
    )
  }

  function mapStateToProps(state, ownProps) {
    const localValues = state.adapters[ownProps.namespace] || {}
    const sources = state.sources
    const eitherProps = generateProps(instructions, localValues, sources)

    return Either.either(
      (error) => ({
        error,
        localValues,
        sources,
      }),
      (wrappedProps) => ({
        wrappedProps,
        localValues,
        sources,
      })
    )(eitherProps)
  }

  return connect(mapStateToProps, {
    setAdapterValue
  })(AdaptComponent)
}

export default Adapter
