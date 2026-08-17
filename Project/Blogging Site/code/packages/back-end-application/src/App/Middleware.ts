import {IErrorBoundary, Request, Response, ServerError} from "common-back-end"

export default class DefaultMiddleware 
implements IErrorBoundary<{},{}>
{
    async errorBoundary(error: ServerError, request: Request<{}, {}, {}>, response: Response<{}> ) {
        response.submit({
            message:error.message,
        }, error.getCode())
    }
    
}