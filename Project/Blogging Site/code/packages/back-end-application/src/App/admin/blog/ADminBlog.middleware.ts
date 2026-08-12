import {IAuthentication, Request} from "common-back-end"
export default class AdminBlogMiddleware 
implements IAuthentication
{
    authentication(request: Request){}
}