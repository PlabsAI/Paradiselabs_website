import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Workflow from './components/Workflow'
import './components/styles.css'

// Render main app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Render workflow component
const workflowRoot = document.getElementById('workflow-root')
if (workflowRoot) {
  ReactDOM.createRoot(workflowRoot).render(
    <React.StrictMode>
      <Workflow />
    </React.StrictMode>
  )
}
