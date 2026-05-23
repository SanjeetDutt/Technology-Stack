"use client"

import {useAuth} from "@store";
import {AuthenticationError} from "@/library/DTO";
import style from "./layout.module.scss"
import React from "react";
import {HamburgerImg} from "@/library/icon";

export default function (props: LayoutProps<"/admin">){
    const {token} = useAuth()
    if(!token){
        throw new AuthenticationError("Please login to access the content")
    }

    const collapseHandler = ()=>{}
    return(
        <div className={`row-flex w-100vw h-100vh`}>
            <div className={style.layoutLeftNav}></div>
            <div className="column-flex">
                <div className={`${style.layoutTopNav} justify-space-between`}>
                    <CollapseBtn onClick={collapseHandler}/>
                    <SearchBox />
                    <UserDropDown />
                </div>
                <div className={style.layoutContent}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

const CollapseBtn:React.FC<{onClick:()=>void}> = (props)=>{
    return <HamburgerImg onClick={props.onClick}/>
}

const SearchBox:React.FC = ()=>{
    return (<div></div>)
}

const UserDropDown:React.FC = ()=>{
    return(
        <div>User</div>
    )
}