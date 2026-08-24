import {GET, EndpointConfig} from "common-back-end"
import { AdminUserConfig } from "./AdminUser.middleware";

export type GetUserConfig = EndpointConfig<{
    payload:{},
    response:{}
}> & AdminUserConfig

export class GetUsersRoute extends GET<GetUserConfig>{
    async execute(){
        // this
    }
}