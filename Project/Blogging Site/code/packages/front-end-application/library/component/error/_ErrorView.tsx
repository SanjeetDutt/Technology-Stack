import React from "react";
import {Card} from "@component";
import style from "./ErrorView.module.scss"
import {Cross} from "@/library/icon";

type ErrorIcon = "CROSS"

interface ErrorCardProps{
    title: string,
    description?: string,
    icons?:ErrorIcon,
    children: React.ReactNode
}
export const ErrorView:React.FC<ErrorCardProps> = (props)=>{
    return (
        <div className={`justify-center align-center h-100vh w-100vw ${style.error}`}>
            <Card>
                <div className="row-flex gap-sm">
                    <Icon icon={props.icons} />
                    <div className="column-flex gap-md">
                        <h1>{props.title}</h1>
                        {props.description && (
                            <p>{props.description}</p>
                        )}
                        <div className="row-flex gap-sm justify-right">
                            {props.children}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

const Icon:React.FC<{icon?:ErrorIcon}> = ({icon})=>{
    switch (icon){
        case "CROSS":
            return <Cross/>

        default:
            return <></>
    }
}