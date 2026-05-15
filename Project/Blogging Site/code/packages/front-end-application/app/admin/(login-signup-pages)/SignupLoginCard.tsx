import React from "react";
import style from "./SignupLoginCard.module.scss"
import {Card} from "@component";
interface SignupLoginCardProps {
    children:React.ReactNode
    title:string
    subtitle:string
}
export const SignupLoginCard:React.FC<SignupLoginCardProps> = (props)=>{

    return (
        <div className={style.signupLoginCard}>
            <Card>
                <div className={`column-flex gap-lg`}>
                    <div className="column-flex gap-sm">
                        <h1 className={style.signupLoginCardTitle}>{props.title}</h1>
                        <p className={style.signupLoginCardSubTitle}>{props.subtitle}</p>

                    </div>
                    {props.children}
                </div>
            </Card>
        </div>
    )
}