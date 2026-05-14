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
    const {currentTheme} = useTheme()
    return (
        <body className={`app-container ${currentTheme==="LIGHT"?'light-theme':'dark-theme'}`}>
            {children}
        </body>
    )
}