import {POST, EndpointConfig} from "common-back-end"
import { AdminUserConfig } from "./AdminUser.middleware";

type PostUserConfig = EndpointConfig<{
    payload:{},
    response:{}
}> & AdminUserConfig

export class CraeteNewUserRoute extends POST<PostUserConfig>{
    async execute(){
        // this
    }
}