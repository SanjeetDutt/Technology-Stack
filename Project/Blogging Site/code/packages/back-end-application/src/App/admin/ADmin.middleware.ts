import {Authentication} from "common-back-end"
export class AdminGuard extends Authentication<{
    payload:{},
    response:{}
}>{
    async authenticate(){}
}