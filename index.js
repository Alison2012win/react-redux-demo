import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './views/containers/App'
import rootReducer from './views/reducers'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, createLogger())
)

render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
)

store.subscribe(render)
