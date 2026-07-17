import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Redirect Netlify subdomain to custom domain
if (window.location.hostname === 'codezgaurav.netlify.app') {
  window.location.replace(
    'https://codezgaurav.in' +
    window.location.pathname +
    window.location.search +
    window.location.hash
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
