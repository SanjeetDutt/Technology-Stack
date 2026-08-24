import {Authentication, POST, EndpointConfig} from "common-back-end"
import { DefaultMiddlewareConfig } from "../../Middleware";

type CONFIG = EndpointConfig<{
    payload:{},
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