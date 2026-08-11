import {ErrorBoundry, Request, Response, ServerError} from "common-back-end"
export default class TestErrorBoundary implements ErrorBoundry{
    errorBoundry(request: Request, response: Response, error: ServerError): void {
        
    }
    
}