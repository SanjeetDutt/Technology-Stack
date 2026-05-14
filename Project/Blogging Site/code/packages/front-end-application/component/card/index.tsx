import style from "./index.module.scss"
import {FC} from "react";

interface CardProps {
    className?: string[];
    children?: React.ReactNode;
}
export const Card:FC<CardProps> = (props)=>{
    const className:string[] = [style.card,...(props.className||[])];
    return (
        <div className={className.join(" ")}>
            {props.children}
        </div>
    )
}