import { useSlice } from "sanjeet-ui"
import { ThemeSlice } from "./stores/Theme"

export const App = () =>  {
    const theme = useSlice(ThemeSlice)
    return (
        <div className="test">
            <button onClick={theme.method.toggleTheme}>Toggle Theme</button>
        </div>
    )
}