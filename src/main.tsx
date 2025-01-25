import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App'
import GlobalStyles, { theme } from './components/GlobalStyles'

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  React.createElement(React.Fragment, null,
    React.createElement(ThemeProvider, { theme },
      React.createElement(GlobalStyles, null),
      React.createElement(App, null)
    )
  )
)
