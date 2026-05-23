"use client"

import {useAuth} from "@store";
import {AuthenticationError} from "@/library/DTO";
import style from "./layout.module.scss"
import React, {useState} from "react";
import {HamburgerImg} from "@/library/icon";
import {DashboardNavigation, DashboardSearch, DashboardUserDropDown} from "@component";

export default function (props: LayoutProps<"/admin">){
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(true)
    const {token, jwt} = useAuth()
    if(!token){
        throw new AuthenticationError("Please login to access the content")
    }

    const collapseHandler = ()=>{
        setDrawerOpen(e=>!e)
    }
    return(
        <div className={`row-flex w-100vw h-100vh`}>
            <div className={`${style.layoutLeftNav} ${isDrawerOpen ? style.layoutLeftNavOpen : style.layoutLeftNavClose}`}>
                <DashboardNavigation isDrawerOpen={isDrawerOpen} />
            </div>
            <div className="column-flex">
                <div className={`${style.layoutTopNav} ${isDrawerOpen ? style.layoutTopNavOpen : style.layoutTopNavClose} justify-space-between align-center`}>
                    <CollapseBtn onClick={collapseHandler}/>
                    <DashboardSearch />
                    <DashboardUserDropDown name={jwt?.name||""} subText={jwt?.email||""} />
                </div>
                <div className={`${style.layoutContent} ${isDrawerOpen ? style.layoutContentOpen : style.layoutContentClose}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

const CollapseBtn:React.FC<{onClick:()=>void}> = (props)=>{
    return <HamburgerImg className={"cursor-pointer"} onClick={props.onClick}/>
}

const SearchBox:React.FC = ()=>{
    return (<div></div>)
}