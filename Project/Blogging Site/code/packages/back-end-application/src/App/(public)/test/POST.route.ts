import {Authentication, POST, EndpointConfig} from "common-back-end"
import { DefaultMiddlewareConfig } from "../../Middleware";

type CONFIG = EndpointConfig<{
    payload:{
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
    response:{},
    param:{},
    query:{}
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