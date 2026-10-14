import {Authentication, POST, RouteConfig} from "common-back-end"
import { DefaultMiddlewareConfig } from "../../Middleware";
import { AllFlags } from "../../typetest";

type CONFIG = RouteConfig<{
    PAYLOAD: AllFlags,
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