import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const isDev = import.meta.env.MODE === 'development'

createRoot(root).render(
  isDev ? (
    <App />
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  ),
)
