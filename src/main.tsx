import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AnimatedLogo from './components/AnimatedLogo'
import '../styles.css'

// Render main app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Render logo
ReactDOM.createRoot(document.getElementById('logo-container')!).render(
  <React.StrictMode>
    <AnimatedLogo />
  </React.StrictMode>
)
