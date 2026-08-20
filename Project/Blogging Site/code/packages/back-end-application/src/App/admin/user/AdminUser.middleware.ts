import {Authentication} from "common-back-end"
export class AdminUserMiddleware extends Authentication<{
    payload:{},
    response:{}
}>
{
    async authenticate(){}
}