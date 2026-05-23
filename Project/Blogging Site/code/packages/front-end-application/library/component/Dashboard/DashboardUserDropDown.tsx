"use client"

import React, {useState} from "react";
import {Down, User} from "@/library/icon";
import style from "./DashboardUserDropDown.module.scss"
import {useRouter} from "next/navigation"

interface DashboardUserDropDownProps{
    name: string,
    subText: string
}
export const DashboardUserDropDown:React.FC<DashboardUserDropDownProps> = (props)=> {
    const [ddOpen, setDdOpen] = useState<boolean>(false)

    const toggleDD = ()=>{
        setDdOpen(e=>!e)
    }
    return (
        <div className={`row-flex gap-sm align-center p-relative cursor-pointer`} onClick={toggleDD}>
            <div>
                <User />
            </div>
            <div className="column-flex gap-sm">
                <h1>{props.name}</h1>
                <h5>{props.subText}</h5>
            </div>
            <div>
                <Down />
            </div>
            <DropDown isOpen={ddOpen} />
        </div>
    )
}

interface DropDownProps{
    isOpen: boolean
}
const DropDown:React.FC<DropDownProps> = (props)=>{
    const router = useRouter()

    const signout = ()=>{
        router.push("/admin/logout")
    }

    const profile = ()=>{
        router.push("/admin/profile/edit")
    }
    return(
        <div
            className={`column-flex gap-md ${style.dropdownContainer} ${props.isOpen ? style.dropdownOpen : style.dropdownClose}`}>
            <div className={style.dropdownOption} onClick={profile}>Edit profile</div>
            <div className={style.dropdownOption} onClick={signout}>Sign out</div>

        </div>
    )
}