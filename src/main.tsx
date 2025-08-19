import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './examples/DataTableDemo'
import InputFieldDemo from './examples/InputFieldDemo'
import './styles/globals.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InputFieldDemo />
    <App />
  </StrictMode>,
)
