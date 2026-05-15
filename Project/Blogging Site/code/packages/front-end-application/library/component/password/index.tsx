"use client"
import {DefaultInputProps, InputWrapper} from "../_abstract"
import React, {useState} from "react";
import {EyeOpen, EyeCross} from "@/library/icon"

interface PasswordProps extends DefaultInputProps{}

export const Password:React.FC<PasswordProps> = (props)=>{
    const [showPassword, setShow] = useState<boolean>(false)
    const showToggle = ()=>{
        setShow(val=>!val)
    }
    return (
        <InputWrapper {...props}
        className={"password"}
        Input={(props)=>(
            <>
                <input {...props} type={showPassword ? "text" : "password"}/>
                <span onClick={showToggle}>{showPassword?<EyeCross className="cursor-pointer" />:<EyeOpen className="cursor-pointer" />}</span>
            </>
        )}
        />
    )
}