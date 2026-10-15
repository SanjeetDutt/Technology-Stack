import {useAuth} from "@store";
import {createGateway} from "../Gateway"
import { AdminBlogByIdPostPayload, AdminBlogByIdPostQuery } from "../Gateway/Gateway.schema";

namespace API {
    export interface Headers{
        contentType:"application/json",
        authorization: string
    }

    export type URL = `/${string}`

    export type GET_HEAD = "GET"|"HEAD"

    export type POST_PUT_PATCH_DELETE = "POST"|"PUT"|"PATCH"|"DELETE"
}

const host = "http://localhost:3001" //TODO: Update it to env variable

const Fetch = async (url:API.URL, inits:RequestInit):Promise<any>=>{
    try {
        const api = createGateway()
        const payload:AdminBlogByIdPostPayload = {
            message:""
        }
        const query:AdminBlogByIdPostQuery = {
            offset:0,
            limit:0
        }
        const response = await api.admin.blog(45).POST({payload,query})
        return response
    } catch (e){
        console.error("GOT ERROR", e)
        return null
    }
}

const GetOrHead = async <Response = any>(url: API.URL, method:API.GET_HEAD, headers?: API.Headers)=>{
    const {token, type} = useAuth()
    const tokenFromStore = token === null ? "" : `${type} ${token}`
    return await Fetch<Response>(url, {
        method,
        headers:{
            'Content-Type': headers?.contentType || "application/json",
            'Authorization': headers?.authorization || tokenFromStore || ""
        }
    })
}

const PostPatchDeletePut = async <Request=any, Response=any>(url:API.URL, method:API.POST_PUT_PATCH_DELETE, headers?:API.Headers, body?:Request)=>{
    return await Fetch<Response>(url,{
        method,
        headers:{
            'Content-Type': headers?.contentType || "application/json",
            'Authorization': headers?.authorization || ""
        },
        body:body ? JSON.stringify(body) : undefined
    })
}
export const useAPI =()=>( {
    get: <Response = any>(url:API.URL, h?:API.Headers)=>GetOrHead<Response>(url,"GET",h),
    head:<Response = any>(url:API.URL, h?:API.Headers)=>GetOrHead<Response>(url,"HEAD",h),
    post:<Req=any,Res=any>(url:API.URL, b?:Req,h?:API.Headers)=>PostPatchDeletePut<Req,Res>(url,"POST",h,b),
    put:<Req=any,Res=any>(url:API.URL, b?:Req,h?:API.Headers)=>PostPatchDeletePut<Req,Res>(url,"PUT",h,b),
    patch:<Req=any,Res=any>(url:API.URL, b?:Req,h?:API.Headers)=>PostPatchDeletePut<Req,Res>(url,"PATCH",h,b),
    delete:<Req=any,Res=any>(url:API.URL, b?:Req,h?:API.Headers)=>PostPatchDeletePut<Req,Res>(url,"DELETE",h,b),
})
