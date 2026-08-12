import {IAuthentication, Request} from "common-back-end"
export default class AdminUserMiddleware 
implements IAuthentication
{
    authentication(request: Request){}
}