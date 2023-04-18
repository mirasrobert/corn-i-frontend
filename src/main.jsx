import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import Container from './components/Container'

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

  // </React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Container>
        <App />
      </Container>
    </BrowserRouter>
  </Provider>
)
