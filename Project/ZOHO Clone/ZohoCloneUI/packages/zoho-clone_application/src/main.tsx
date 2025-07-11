import {createRoot} from 'react-dom/client'
import { ThemeProvider } from './stores/Theme'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
  
)
