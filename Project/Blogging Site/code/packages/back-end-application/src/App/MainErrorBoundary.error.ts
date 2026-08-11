import {ErrorBoundry, ServerError, Request, Response} from "common-back-end"
export default class MainErrorBoundary implements ErrorBoundry{
    errorBoundry(request:Request, response: Response, error:ServerError): void {
        
    }
}