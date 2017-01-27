import React from 'react'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import Board from './components/Board'
import rootReducer from './reducers'
import { setSourceValue } from './actions'

const store = createStore(rootReducer, undefined, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
))

store.dispatch(setSourceValue('cities',
  [
    {
      name: 'Olgi',
      population: 5000
    },
    {
      name: 'BG',
      population: 30000
    }
  ]
))

store.dispatch(setSourceValue('friends', [
  {
    name: 'Giova',
    height: 173
  },
  {
    name: 'Rinne',
    height: 189
  }
]))

const App = () => (
  <Provider store={store}>
    {/* <div>OCI~o</div> */}
    <Board />
  </Provider>
)

export default App
