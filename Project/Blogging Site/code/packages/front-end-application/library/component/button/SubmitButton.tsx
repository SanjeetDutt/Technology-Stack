import React from "react";
import {Button} from "@/library/component";

interface SubmitButtonProps{
    children: React.ReactNode
}
export const SubmitButton:React.FC<SubmitButtonProps> = (props)=>{
    const clickHandler = ()=>{}
    return (
        <Button onClick={clickHandler}>
            {props.children}
        </Button>
    )
}