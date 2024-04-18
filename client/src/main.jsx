import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Web3Provider } from './components/Web3Provider.jsx'
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Web3Provider>
      <App />
    </Web3Provider>
    </Router>
  </React.StrictMode>,
)
