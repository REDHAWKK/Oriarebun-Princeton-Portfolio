import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OriarebunPortfolio from './home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OriarebunPortfolio />
  </StrictMode>,
)
