import {Authentication, EndpointConfig} from "common-back-end"
import { AdminMiddlewareConfig } from "../Admin.middleware";

export type AdminUserConfig = EndpointConfig<{
    response:{},
    payload:{}
}> & AdminMiddlewareConfig

export class AdminUserMiddleware extends Authentication<AdminUserConfig>
{
    async authenticate(){}
}