import React from "react";
import {ErrorView} from "@/library/component/error/_ErrorView";
import {Button} from "@component";

interface GenericErrorProps{
    error: Error
    retry: ()=>void
}
export const GenericError:React.FC<GenericErrorProps> = (props)=>{
    const logoutHandler = ()=>{}
    return(
        <ErrorView title={props.error.message} icons="CROSS">
            <Button onClick={logoutHandler}>
                Logout
            </Button>

            <Button onClick={props.retry}>
                Retry
            </Button>
        </ErrorView>
    )
}