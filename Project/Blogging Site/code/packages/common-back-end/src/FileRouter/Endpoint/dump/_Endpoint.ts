import { Server } from "../../../Server/Server";
import { IRouter } from "../../Router";
import { Method } from "../../types";
import Express from "express"
import {Endpoint, IEndpoint} from ".../dump/dump/IEndpoint"
import {IAuthentication} from ".../dump/dump/IAuthentication"
import { IValidation } from ".../dump/dump/IValidation";
import { IErrorBoundary } from ".../dump/dump/IErrorBoundary";
import { Request, Response, ResponseBuilder } from "../../Context";
import { ServerError } from "../../../Error";
import { RequestBuilder } from "../../Context";

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
    protected server: Server|undefined
    
    constructor(method: Method, router: IRouter){
        this.method = method
        this.router = router
    }
    getAuthentication(): IAuthentication<B,R,P,Q>[] {
        //TODO: add route auth
        return this.router.getAuthentication()
    }
    getValidation(): IValidation<B,R,P,Q>[] {
        return this.router.getValidation()
    }
    //@ts-ignore
    getErrorBoundary(): IErrorBoundary<B,R>|undefined {
        return undefined
        // return this.router.getErrorBoundary()
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

    getServer(){
        return this.server!
    }

    protected handleApplicationRequest(){
        if(!this.server){
            throw new Error("Server not setup.")
        }
        return async (Erequest:Express.Request<P,B,Q>, Eresponse:Express.Response, next: Express.NextFunction)=>{
            const request = RequestBuilder<B,P,Q>()
                // .endpoint(this)
                .express(Erequest)
                .server(this.server!)
                .build()
            
            const response = ResponseBuilder<R>()
                .express(Eresponse)
                .request(request)
                .build()
            
            const execute = async (fn: (request?:Request<B,P,Q>, response?:Response<R>)=>Promise<any>|any, startMsg?:string, endMsg?: string)=>{
                const executeMsg = (msg?:string)=> msg && request.logger.log(msg.replaceAll("$name", fn.constructor.name))
                executeMsg(startMsg)
                await fn(request,response)
                executeMsg(endMsg)
            }
            try{
                for(const auth of this.getAuthentication()){
                    await execute(auth.authentication, "Authenticating the request from $name", "Authentication Complete from $name")
                }
                for(const validation of this.getValidation()){
                    await execute(validation.validation, "Validating request from $name", "Validate successfull from $name")
                }
                await execute(this.call,"Executing $name call function", "Executed $name call function")
            } catch(e){
                request.logger.error("Encounter an error while processing request" + e)
                const errorBoundary = this.getErrorBoundary()
                if(errorBoundary){
                    request.logger.log(`Executing error boundary ${errorBoundary.constructor.name}`)
                    // await errorBoundary.errorBoundary(
                    //     e as ServerError,
                    //     // request, 
                    //     response
                    // )
                    request.logger.log(`Executed error boundary ${errorBoundary.constructor.name}`)
                }
            } finally{
                response.submitIfNot()
                request.logger.flush()
            }
        }
    }

    register(server:Server):void{
        this.server = server
        this.registerEndpoint(server)
    }

    abstract registerEndpoint(server: Server):void
    
    abstract call(request?: Request<B,P,Q>, response?:Response<R>):void | Promise<void>
}












