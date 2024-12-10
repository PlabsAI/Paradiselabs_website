import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App'
import Workflow from './components/Workflow'
import GlobalStyles, { theme } from './components/GlobalStyles'

// Render main app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

// Render workflow component
const workflowRoot = document.getElementById('workflow-root')
if (workflowRoot) {
  ReactDOM.createRoot(workflowRoot).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Workflow />
      </ThemeProvider>
    </React.StrictMode>
  )
}
