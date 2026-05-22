import {API} from "./_API";
import {LoginRequest, LoginResponse} from "back-end-application/src"

export const userLogin = async (email:string, password:string)=>{
    return await API.post<LoginRequest,LoginResponse>("/user/login",{email, password})
}