import {POST, RouteConfig} from "common-back-end"
import { AdminUserConfig } from "./AdminUser.middleware";

type PostUserConfig = RouteConfig<{
    PAYLOAD:{},
    RESPONSE:{}
}> & AdminUserConfig

export class CraeteNewUserRoute extends POST<PostUserConfig>{
    async execute(){
        // this
    }
}