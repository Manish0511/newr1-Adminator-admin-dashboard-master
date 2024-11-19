import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import indexStore from './store/index.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={indexStore}>
      <App />
    </Provider>
  // </StrictMode>,
)
