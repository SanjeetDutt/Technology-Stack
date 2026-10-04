import {Authentication, RouteConfig} from "common-back-end"
import { AdminMiddlewareConfig } from "../AdminRoot.middleware";

export type AdminBlogConfig = RouteConfig<{
    PAYLOAD:{},
    RESPONSE:{}
}> & AdminMiddlewareConfig

export class AdminBlogMiddleware extends Authentication<AdminBlogConfig>
{
    async authenticate(){}
}