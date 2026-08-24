import {Authentication, EndpointConfig} from "common-back-end"
import { AdminMiddlewareConfig } from "../Admin.middleware";

export type AdminBlogConfig = EndpointConfig<{
    payload:{},
    response:{}
}> & AdminMiddlewareConfig

export class AdminBlogMiddleware extends Authentication<AdminBlogConfig>
{
    async authenticate(){}
}