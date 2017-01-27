import React from 'react'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import Board from './components/Board'
import rootReducer from './reducers'

const store = createStore(rootReducer, undefined, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
))

// TODO: A component should manage settings source from user varous user input...
store.dispatch({
  type: 'SET_SOURCE',
  payload: {
    key: 'cities',
    data: [
      {
        name: 'Olgi',
        population: 5000
      },
      {
        name: 'BG',
        population: 30000
      }
    ]
  }
})

store.dispatch({
  type: 'SET_SOURCE',
  payload: {
    key: 'friends',
    data: [
      {
        name: 'Giova',
        height: 173
      },
      {
        name: 'Rinne',
        height: 189
      }
    ]
  }
})

const App = () => (
  <Provider store={store}>
    <Board />
  </Provider>
)

export default App
