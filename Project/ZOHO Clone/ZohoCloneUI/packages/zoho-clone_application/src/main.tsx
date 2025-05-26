import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './App'
import "./index.css"
import {UserInterfaceProvider} from "sanjeet-ui"
import {BREAKPOINT, DARK_THEME_COLOR, DEFAULT_THEME, LIGHT_THEME_COLOR, UTILITY_PALLET} from "./configurations";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <UserInterfaceProvider
          breakpoint={BREAKPOINT}
          defaultTheme={DEFAULT_THEME}
          lightThemeColor={LIGHT_THEME_COLOR}
          darkThemeColor={DARK_THEME_COLOR}
          utilityPallet={UTILITY_PALLET}
      >
          <App />
      </UserInterfaceProvider>
  </StrictMode>,
)
