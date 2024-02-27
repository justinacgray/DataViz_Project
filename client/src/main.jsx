import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataframeProvider } from './context/DataframeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataframeProvider>
    <App />
    </DataframeProvider>
  </React.StrictMode>,
)
