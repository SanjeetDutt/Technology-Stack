import {POST, Authentication, Validation, EndpointConfig} from "common-back-end"
import { AdminBlogConfig } from "../AdminBlog.middleware";

export type Configuration = EndpointConfig<{
    payload:{
        message: string
    },
    response:{
        message: string
    },
    param:{
        id: string
    },
    query:{
        offset:number,
        limit: number,
        sort: string
    },
}> & AdminBlogConfig

export class CreateNewBlog extends POST<Configuration> 
{
    async execute(){
        const auth = this.request.header.get("authorization")
        const user = this.request.header.get("userAuth")
        const id = this.request.param.get("id")
        const offset = this.request.query.get("offset")

        this.response.status(200).body({
            message:"HEY I AM THE RESPONSE FROM APP."
        })
    }
}

export class AuthenticateNewBlog extends Authentication<Configuration>
{
    authenticate(){
        this.request.header.set("userAuth",{
            name: "SANJEET DUTT",
            email:"sanjeetdutt@gmail.com",
            id:"12345"
        })
        
    }
}

export class ValidateNewBlog extends Validation<Configuration>{
    validate(){
    }
}