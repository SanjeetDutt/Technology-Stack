import {Authentication, RouteConfig} from "common-back-end"
import { AdminMiddlewareConfig } from "../Admin.middleware";

export type AdminBlogConfig = RouteConfig<{
    PAYLOAD:{},
    RESPONSE:{}
}> & AdminMiddlewareConfig

export class AdminBlogMiddleware extends Authentication<AdminBlogConfig>
{
    async authenticate(){}
}