import {IAuthentication, Request} from "common-back-end"
export default class AdminBlogMiddleware 
implements IAuthentication
{
    async authentication(request: Request){}
}