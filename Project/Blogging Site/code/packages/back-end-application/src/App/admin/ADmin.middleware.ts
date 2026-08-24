import {Authentication,EndpointConfig} from "common-back-end"

export type AdminMiddlewareConfig = EndpointConfig<{
    payload:{},
    response:{},
    header:{
        authorization: string,
        userAuth: {
            name: string,
            email: string,
            id: string
        }
    }
}>

export class AdminGuard extends Authentication<AdminMiddlewareConfig>{
    async authenticate(){}
}