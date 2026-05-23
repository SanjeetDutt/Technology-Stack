import {AuthenticationError as AuthenticationErrorDTO} from "@/library/DTO";
import {ErrorView} from "./_ErrorView";
import {Button} from "@component";
import React from "react";
import {useRouter} from "next/navigation"
interface AuthenticationErrorProps{
    error: AuthenticationErrorDTO
}
export const AuthErrorCard:React.FC<AuthenticationErrorProps> = (props)=>{
    const router = useRouter()
    const clickHandler = ()=>{
        router.push("/admin/login")
    }
    return(
        <ErrorView title={"Authentication Error"} description={props.error.message} icons="CROSS" >
            <Button onClick={clickHandler}>
                Login
            </Button>
        </ErrorView>
    )
}