import {POST, Authentication, Validation, EndpointConfig} from "common-back-end"

type Configuration = EndpointConfig<{
    payload:{
        message: string
    },
    response:{},
    param:{
        id: string
    },
    query:{
        offset:number,
        limit: number,
        sort: string
    },
    header:{
        authorization: string,
        userAuth: {
            name: string,
            email: string,
            id: string
        }
    }
}>

export class CreateNewBlog extends POST<Configuration> 
{
    async execute(){
        const auth = this.request.header.get("authorization")
        const user = this.request.header.get("userAuth")
        const id = this.request.param.get("id")
        const offset = this.request.query.get("offset")
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