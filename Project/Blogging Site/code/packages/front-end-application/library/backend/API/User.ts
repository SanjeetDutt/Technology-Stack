import {User} from "back-end-application/src"
import {useAPI} from "@/library/hook";

export const login = async (email:string, password:string)=>{
    return await useAPI().post<User.Login.Request,User.Login.Response>("/user/login",{email, password})
}