"use client"
import {useEffect} from "react";
import {useAuth} from "@store";
import {useRouter} from "next/navigation"
export default function () {
    const {logout} = useAuth()
    const router = useRouter()
    useEffect(()=>{
        logout()
        router.push("/admin/login")
    },[])
    return <></>
}