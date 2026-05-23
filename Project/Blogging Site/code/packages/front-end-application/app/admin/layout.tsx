"use client"

import style from "./layout.module.scss"
import {AuthProvider} from "@store";
export default function (props:LayoutProps<"/admin">){

    return(
        <div className={style.layout} style={{backgroundImage: 'url("/img/BgBlue.svg")'}}>
            <div className={style.content}>
                <AuthProvider>
                    {props.children}
                </AuthProvider>
            </div>
        </div>
    )
}