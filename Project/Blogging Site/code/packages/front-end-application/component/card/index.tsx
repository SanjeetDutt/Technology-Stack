import style from "./index.module.scss"
import React, {FC} from "react";

interface CardProps {
    children?: React.ReactNode;
}
export const Card:FC<CardProps> = (props)=>{
    return (
        <div className={style.card}>
            {props.children}
        </div>
    )
}