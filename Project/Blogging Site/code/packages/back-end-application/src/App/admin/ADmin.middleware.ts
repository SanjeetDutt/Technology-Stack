import {IAuthentication, Request} from "common-back-end"
export default class AdminGuard 
implements IAuthentication
{
    authentication(request: Request){}
}