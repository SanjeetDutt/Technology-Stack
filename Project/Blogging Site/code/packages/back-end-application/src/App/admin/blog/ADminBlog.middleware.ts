import {Authentication} from "common-back-end"
export class AdminBlogMiddleware extends Authentication<{
    payload:{},
    response:{}
}>
{
    async authenticate(){}
}