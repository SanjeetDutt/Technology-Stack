import type React from "react"
import {createSlice, Store, useSlice} from "sanjeet-ui"

export const ThemeSlice = createSlice({
    state: {
        currentTheme: "LIGHT"
    }, 
    method: {
        toggleTheme:()=>(state)=>{
            state.currentTheme = state.currentTheme === "LIGHT" ? "DARK" : "LIGHT"
        }
    },
    computed:{
        isLightTheme:(state)=>{
            return state.currentTheme === "LIGHT"
        }
    }
})

export const ThemeProvider = (props: {children: React.ReactNode})=>{
    return (
        <Store slices={[ThemeSlice]}>
            <ThemeWrapper>
                {props.children}
            </ThemeWrapper>
        </Store>
    )
}

export const ThemeWrapper = (props:{children:React.ReactNode})=>{
    const theme = useSlice(ThemeSlice)

    const currentTheme = theme.computed.isLightTheme ? "light-theme" : "dark-theme"  
    return (
        <div className={`theme-wrapper ${currentTheme}`}>
            {props.children}
        </div>
    )
}