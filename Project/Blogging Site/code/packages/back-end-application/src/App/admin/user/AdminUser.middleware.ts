import {Authentication, RouteConfig} from "common-back-end"
import { AdminMiddlewareConfig } from "../Admin.middleware";

export type AdminUserConfig = RouteConfig<{
    RESPONSE:{},
    PAYLOAD:{}
}> & AdminMiddlewareConfig

export class AdminUserMiddleware extends Authentication<AdminUserConfig>
{
    async authenticate(){}
}