import { ServerError } from "../Error";
import { Server } from "../Server/Server";
import { Request } from "./Request";
import { Response } from "./Response";
import { IRouter } from "./Router";
import { FileRouter } from "./types";
import Express from "express"

/**
 * Endpoint
 * - End node in the Router tree
 * - Meta data - call
 */

export interface IEndpoint{
    getRouter(): IRouter
    getPath(): FileRouter.Path
    getMethod(): FileRouter.Method
    getAuthentication(): IAuthentication[]
    getValidation(): IValidation[]
    getErrorBoundary():IErrorBoundry|undefined
    register(server:Server):void
    call(request: Request, response: Response):void
    getRootErrorBoundary():IErrorBoundry|undefined
}

abstract class AbstractEndpoint implements IEndpoint{
    protected readonly method: FileRouter.Method
    protected readonly router: IRouter
    
    constructor(method: FileRouter.Method, router: IRouter){
        this.method = method
        this.router = router
    }
    getAuthentication(): IAuthentication[] {
        //TODO: add route auth
        return this.router.getAuthentication()
    }
    getValidation(): IValidation[] {
        return this.router.getValidation()
    }
    getErrorBoundary(): IErrorBoundry|undefined {
        return this.router.getErrorBoundary()
    }

    getRouter(){
        return this.router
    }

    getPath(){
        return this.router.getPath()
    }

    getMethod(){
        return this.method
    }

    getRootErrorBoundary(){
        return this.getRouter().getRoot().getErrorBoundary()
    }

    protected handleApplicationRequest(server: Server){
        return async (Erequest:Express.Request, Eresponse:Express.Response, next: Express.NextFunction)=>{
            const request = Request.Create(server, this, {request: Erequest, response: Eresponse, next})
            const response = Response.Create(server, this, request, {request: Erequest, response: Eresponse, next})

            try{
                for(const auth of this.getAuthentication()){
                    request.logger.log(`Authenticating the request from ${auth.constructor.name}`)
                    await auth.authentication(request, response)
                    request.logger.log(`Request authenticated from ${auth.constructor.name}`)
                }

                for(const validation of this.getValidation()){
                    request.logger.log(`Validating the request from ${validation.constructor.name}`)
                    await validation.validation(request)
                    request.logger.log(`Request validated from ${validation.constructor.name}`)
                }

                request.logger.log(`Calling the call function of ${this.constructor.name}`)
                this.call(request, response)
                request.logger.log(`Call successful from ${this.constructor.name}`)
                
            } catch(e){
                request.logger.error("Encounter an error " + e)
                const errorBoundary = this.getErrorBoundary()
                if(errorBoundary){
                    request.logger.log("Error catch by error boundary " + errorBoundary.constructor.name)
                    errorBoundary.errorBoundry(request, response, e as ServerError)
                }
            } finally{
                request.logger.flush()
            }
        }
    }

    abstract register(server:Server):void
    
    abstract call(request: Request, response: Response):void
}

export abstract class GetRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("GET",router)
    }

    register(server:Server){
        server.getExpress().get(this.getPath(), this.handleApplicationRequest(server))
    }
}
export abstract class PutRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("PUT", router)
    }

    register(server:Server){
        server.getExpress().put(this.getPath(), this.handleApplicationRequest(server))
    }
}
export abstract class PatchRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("PATCH", router)
    }

    register(server:Server){
        server.getExpress().patch(this.getPath(), this.handleApplicationRequest(server))
    }
}
export abstract class PostRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("POST", router)
    }

    register(server:Server){
        server.getExpress().post(this.getPath(), this.handleApplicationRequest(server))
    }
}
export abstract class DeleteRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("DELETE", router)
    }

    register(server:Server){
        server.getExpress().delete(this.getPath(), this.handleApplicationRequest(server))
    }
}


export interface IValidation
{
    validation(request: Request):Promise<void>
}

export interface IAuthentication
{
    authentication(request:Request, response: Response):Promise<void>
}

export interface IErrorBoundry
{
    errorBoundry(request: Request, response: Response, error: ServerError):Promise<void>
}