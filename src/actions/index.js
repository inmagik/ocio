export const setAdapterValue = (namespace, field, value) => ({
  type: 'SET_ADAPTER_VALUE',
  payload: { namespace, field, value }
})

export const setSourceValue = (namespace, value) => ({
  type: 'SET_SOURCE_VALUE',
  payload: { namespace, value }
})
