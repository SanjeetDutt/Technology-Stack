"use client"

import React from "react";
import {Dashboard, Pen, SanjeetLogo} from "@/library/icon";
import style from "./DashboardNavigation.module.scss"
import {useRouter, usePathname} from "next/navigation"
interface DashboardNavigationProps{
    isDrawerOpen: boolean
}

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({isDrawerOpen})=>{
    return(
        <div className="column-flex h-100vh">
            <div className={style.DashboardNavigationLogoContainer}>
                <Logo />
            </div>
            <div className={`${style.DashboardNavigationNav} column-flex gap-lg`}>
                <Link isDrawerOpen={isDrawerOpen} text="Dashboard" link="/admin/dashboard">
                    <Dashboard />
                </Link>

                <Link isDrawerOpen={isDrawerOpen} text="Blogs" link="/admin/blog">
                    <Pen />
                </Link>
            </div>
        </div>
    )
}

const Logo = ()=>{
    return(
        <SanjeetLogo />
    )
}

interface LinkProps{
    isDrawerOpen: boolean
    children: React.ReactNode
    text: string
    link:string
}
const Link:React.FC<LinkProps> = (props)=>{
    const router = useRouter()
    const pathname = usePathname()

    const isLinkActive = pathname.startsWith(props.link)
    const clickHandler = ()=>{
        router.push(props.link)
    }
    return(
        <div className={`${style.DashboardNavigationNavLink} ${isLinkActive ? style.DashboardNavigationNavLinkActive :''}`} onClick={clickHandler}>
            <div className="row-flex gap-md align-center">
                {props.children}
                {props.isDrawerOpen && (<h4 className={style.DashboardNavigationNavLinkText}>{props.text}</h4>)}
            </div>
        </div>
    )
}