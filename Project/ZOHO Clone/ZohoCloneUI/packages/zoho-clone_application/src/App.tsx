import { useSlice } from "sanjeet-ui"
import { ThemeSlice } from "./stores/Theme"

export const App = () =>  {
    const theme = useSlice(ThemeSlice)
    return (
        <div className="test">
            <h1>THIS IS A TEST HEADING</h1>
            <button onClick={theme.method.toggleTheme}>Toggle Theme</button>
        </div>
    )
}