import {IErrorBoundary, Request, Response, ServerError} from "common-back-end"

export default class DefaultMiddleware 
implements IErrorBoundary<{},{}>
{
    async errorBoundary(error: ServerError, request: Request<{}, {}, {}>, response: Response<{}> ) {
        console.log("ERROR HANDLERS DefaultMiddleware")
        response?.submit({
            message:"This is root error handler",
        }, 400)
    }
    
}