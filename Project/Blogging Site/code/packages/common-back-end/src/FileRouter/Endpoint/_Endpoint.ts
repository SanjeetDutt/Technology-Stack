import { ServerError } from "../../Error";
import { Server } from "../../Server/Server";
import { Request } from "../Request";
import { Response } from "../Response";
import { IRouter } from "../Router";
import { Method } from "../types";
import Express from "express"
import {Endpoint, IEndpoint} from "./IEndpoint"
import {IAuthentication} from "./IAuthentication"
import { IValidation } from "./IValidation";
import { IErrorBoundary } from "./IErrorBoundary";

/**
 * Endpoint
 * - End node in the Router tree
 * - Meta data - call
 */
export abstract class AbstractEndpoint<
    B extends Endpoint.BODY,
    P extends Endpoint.PARAMS,
    Q extends Endpoint.QUERY,
    R extends Endpoint.RESPONSE
> implements IEndpoint<B,P,Q,R>
{
    protected readonly method: Method
    protected readonly router: IRouter
    
    constructor(method: Method, router: IRouter){
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
    getErrorBoundary(): IErrorBoundary|undefined {
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
            const request = Request.Create<B, P, Q, R>(server, this, {request: Erequest, response: Eresponse, next})
            const response = Response.Create<B, P, Q, R>(server, this, request, {request: Erequest, response: Eresponse, next})

            try{
                for(const auth of this.getAuthentication()){
                    request.logger.log(`Authenticating the request from ${auth.constructor.name}`)
                    await auth.authentication()
                    request.logger.log(`Request authenticated from ${auth.constructor.name}`)
                }

                for(const validation of this.getValidation()){
                    request.logger.log(`Validating the request from ${validation.constructor.name}`)
                    await validation.validation()
                    request.logger.log(`Request validated from ${validation.constructor.name}`)
                }

                request.logger.log(`Calling the call function of ${this.constructor.name}`)
                this.call()
                request.logger.log(`Call successful from ${this.constructor.name}`)
                
            } catch(e){
                request.logger.error("Encounter an error " + e)
                const errorBoundary = this.getErrorBoundary()
                if(errorBoundary){
                    request.logger.log("Error catch by error boundary " + errorBoundary.constructor.name)
                    errorBoundary.errorBoundry()
                }
            } finally{
                request.logger.flush()
            }
        }
    }

    abstract register(server:Server):void
    
    abstract call():void
}












