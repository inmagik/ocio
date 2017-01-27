export const setAdapterValue = (namespace, field, value) => ({
  type: 'SET_ADAPTER_VALUE',
  payload: { namespace, field, value }
})
