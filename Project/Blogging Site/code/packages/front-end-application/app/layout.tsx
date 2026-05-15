"use client"

import {ThemeProvider, useTheme} from "@store"
import "@/public/fonts/Elms/style.css"
import "../library/style/index.scss"

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
    const {currentTheme} = useTheme()

    return (
        <body className={`app-container ${currentTheme==="LIGHT"?'light-theme':'dark-theme'}`}>
            {children}
        </body>
    )
}