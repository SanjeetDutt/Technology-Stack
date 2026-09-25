import {GET, RouteConfig} from "common-back-end"
import { AdminUserConfig } from "./AdminUser.middleware";

export type GetUserConfig = RouteConfig<{
    PAYLOAD:{},
    RESPONSE:{}
}> & AdminUserConfig

export class GetUsersRoute extends GET<GetUserConfig>{
    async execute(){
        // this
    }
}