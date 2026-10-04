import {Authentication, RouteConfig} from "common-back-end"
import { AdminMiddlewareConfig } from "../AdminRoot.middleware";

export type AdminUserConfig = RouteConfig<{
    RESPONSE:{},
    PAYLOAD:{}
}> & AdminMiddlewareConfig

export class AdminUserMiddleware extends Authentication<AdminUserConfig>
{
    async authenticate(){}
}