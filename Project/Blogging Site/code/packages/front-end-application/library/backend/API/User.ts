import {LoginRequest, LoginResponse} from "back-end-application/src"
import {useAPI} from "@/library/hook";

export const login = async (email:string, password:string)=>{
    return await useAPI().post<LoginRequest,LoginResponse>("/user/login",{email, password})
}