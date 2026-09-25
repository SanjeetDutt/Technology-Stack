import {Authentication,RouteConfig} from "common-back-end"

export type AdminMiddlewareConfig = RouteConfig<{
    PAYLOAD:{},
    RESPONSE:{},
    header:{
        /**
         * FE to pass Bearer token
         */
        authorization: string,

        /**
         * @private It will be used internally by backend
         */
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