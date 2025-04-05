import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {CssBaseline} from '@mui/material'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <CssBaseline /> {/* it is provided by mui to make margin 0 pading 0 basic properties*/}
    <App />
  </>,
)
