import {Authentication, POST, RouteConfig} from "common-back-end"
import { DefaultMiddlewareConfig } from "../../Middleware";

type CONFIG = RouteConfig<{
    PAYLOAD:{
        message: string[],
        metaData: {
            name: string,
            emai: `${string}@${string}.${string}`,
            address:{
                street: string | number,
                city: string,
                pin: number,
            }[],
            phone?:{
                phone: number,
                type:"TEL"|"Mobile"|"HOME"|"OFFICE"
            }[]
        }[]
    },
    RESPONSE:{},
    PARAM:{},
    QUERY:{}
}> & DefaultMiddlewareConfig

export class TestRoute extends POST<CONFIG>{

    async execute(){
        // this
    }
}

export class AuthenticateTestRoute extends Authentication<CONFIG>{
    authenticate(){
    }
    
}