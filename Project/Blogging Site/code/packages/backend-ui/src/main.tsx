import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style/site.less"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1>HELLO WORLD</h1>
  </StrictMode>,
)
