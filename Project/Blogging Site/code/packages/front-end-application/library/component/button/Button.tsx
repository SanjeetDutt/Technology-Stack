"use client"
import React from "react";
import style from "./Button.module.scss"
interface ButtonProps{
    children: React.ReactNode,
    onClick: ()=>void
}
export const Button:React.FC<ButtonProps> = (props)=>{

    return (
        <button className={style.button} onClick={props.onClick}>
            {props.children}
        </button>
    )
}