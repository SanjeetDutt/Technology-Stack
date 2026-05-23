"use client"
import {AuthErrorCard, GenericError} from "@component";
import {AuthenticationError} from "@/library/DTO";

export default function ({error,reset}:{error:Error; reset:()=>void}){

    if(error instanceof AuthenticationError){
        return <AuthErrorCard error={error} />
    }

    return (
        <GenericError error={error} retry={reset} />
    )
}