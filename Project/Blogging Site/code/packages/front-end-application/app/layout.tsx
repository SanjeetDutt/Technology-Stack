"use client"

import "./_components/global.scss"
import {ThemeProvider, useTheme} from "@/app/_components/store/ThemeStore";

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en">
    <ThemeProvider>
        <AppBody>
            {props.children}
        </AppBody>
    </ThemeProvider>
    </html>
  );
}


function AppBody({children}:{children:React.ReactNode}){
    const {currentTheme, setTheme} = useTheme()

    const toggle = ()=>{
        if(currentTheme === "LIGHT"){
            setTheme("DARK")
        }else {
            setTheme("LIGHT")
        }
    }
    return (
        <body className={`app-container ${currentTheme==="LIGHT"?'light-theme':'dark-theme'}`}>

            <button onClick={toggle}>Toggle theme</button>
            {children}
        </body>
    )
}