"use client"
import React from "react";
import {Button, useForm} from "@/library/component";

interface SubmitButtonProps{
    children: React.ReactNode
}
export const SubmitButton:React.FC<SubmitButtonProps> = (props)=>{
    const form = useForm()
    const clickHandler = ()=>{
        form?.submit()
    }
    return (
        <Button onClick={clickHandler}>
            {props.children}
        </Button>
    )
}