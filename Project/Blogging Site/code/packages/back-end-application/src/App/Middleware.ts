import {IErrorBoundry, Request, Response, ServerError} from "common-back-end"
export default class DefaultMiddleware 
implements IErrorBoundry
{
    async errorBoundry(request:Request, response: Response, error:ServerError){
        console.log("HANDLING THE ERROR BOUNDARY ON ROOT")
    }
}