import {IAuthentication, Request} from "common-back-end"
export default class AdminUserMiddleware 
implements IAuthentication<{},{}>
{
    async authentication(request: Request){}
}