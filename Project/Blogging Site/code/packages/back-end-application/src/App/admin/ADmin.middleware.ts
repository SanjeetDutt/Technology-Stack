import {IAuthentication, Request, Response} from "common-back-end"
export default class AdminGuard 
implements IAuthentication
{
    async authentication(request: Request, response: Response){}
}