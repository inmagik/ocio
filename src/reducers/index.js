import { combineReducers } from 'redux'


const sources = (previousState = {}, action) => {
  if (action.type === 'SET_SOURCE_VALUE') {
    return {
      ...previousState,
      [action.payload.namespace]: action.payload.value
    }
  }

  return previousState
}

const setValue = (previousState, field, value) => {
  const [f, ...remains] = field.split('.')

  if (remains.length) {
     return {
        ...previousState,
       [f]: setValue(previousState[f] || {}, remains.join('.'), value)
     }
  }

  return {
    ...previousState,
    [field]: value
  }
}

const adapters = (previousState = {}, action) => {
  if (action.type === 'SET_ADAPTER_VALUE') {
    return {
      ...previousState,
      [action.payload.namespace]: setValue(
        previousState[action.payload.namespace] || {},
        action.payload.field,
        action.payload.value
      )
    }
  }
  return previousState
}

export default combineReducers({
  sources,
  adapters,
})
