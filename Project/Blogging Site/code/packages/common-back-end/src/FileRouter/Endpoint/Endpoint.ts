import { Server } from "../../Server";
import { Request,Response } from "../Context";
import { IRouter } from "../Router";
import { Method, SubClass } from "../types";
import { _Action } from "./_Action";
import Express from "express"
import { _MethodAction } from "./Actions/_MethodAction";
import { Logger } from "../../Logger";
import { exportEndpoint } from "./export";

interface DefaultActionConfig {
    payload:{}
    response:{}
}
export class Endpoint{
    private readonly method: Method
    private readonly action: SubClass<_MethodAction<DefaultActionConfig>>
    private readonly location: string
    private router?: IRouter
    private server?: Server

    constructor(method:Method, action: SubClass<_MethodAction<DefaultActionConfig>>, location:string){
        this.method = method
        this.action = action
        this.location = location
    }

    getURL(){
        return `[${this.method}] ${this.router?.getPath()}`
    }

    export(){
        return exportEndpoint(this.method, this.action, this.router!, this.location)
    }

    addRouter(router:IRouter){
        this.router = router
    }

    register(server: Server){
        if(!this.router){
            throw new Error("Router not defined to this endpoint")
        }
        this.server = server
        console.log("REGISTERING ",this.method, this.router.getPath())
        const express = server.getExpress()
        switch(this.method){
            case "GET":
                express.get(this.router.getPath(), this.handleRequet)
                break;

            case "POST":
                express.post(this.router.getPath(), this.handleRequet)
                break;

            case "PUT":
                express.put(this.router.getPath(), this.handleRequet)
                break;

            case "PATCH":
                express.patch(this.router.getPath(), this.handleRequet)
                break;

            case "DELETE":
                express.delete(this.router.getPath(), this.handleRequet)
                break;
        }
    }

    handleRequet = async (erequest: Express.Request, eresponse: Express.Response, next: Express.NextFunction)=>{
        const processStart = performance.now()
        if(!this.router){
            throw new Error("Router not added to endpoint")
        }

        const request:Request = Request.Builder()
            .endpoint(this)
            .method(this.method)
            .router(this.router)
            .expressRequest(erequest)
            .build()
        
        const response: Response = Response.Builder()
            .request(request)
            .expressResponse(eresponse)
            .build()

        const logger = Logger.Builder()
            .setCorelationId(request.corelationId)
            .setPath(this.server?.getLogPath())
            .setTimestamp(request.timestamp)
            .build()
        
        this.server?.getServerLogger()?.log(`Request received by server and corelation ${request.corelationId} is created`)
        
        logger?.log("A new request made to server", `Endpoint: ${erequest.originalUrl}`)
        logger?.log(`Corelation ${request.corelationId} is created`)
        logger?.log("Params is parsed : " , JSON.stringify(erequest.params))
        logger?.log("Queries is parsed : " , JSON.stringify(erequest.query))
        logger?.log("Headers is parsed : " , JSON.stringify(erequest.headers))
        logger?.log("Payload is parsed : " , JSON.stringify(request.payload))

        const parsingEnd = performance.now()

        logger?.log(`Parring the whole request took ${this.processTime(parsingEnd, processStart)}`)

        const getName = (obj:any): string=>{
            return obj.name
        }

        for(const auth of this.router.getAuthentication()){
            logger?.log(`Authenticating the request from ${getName(auth)}`)
            const authStart = performance.now()
            const authInstance = new auth(request, response, logger)
            await authInstance.authenticate()
            const authComplete = performance.now()
            logger?.log(`Request is authenticated from ${getName(auth)}`, `Authenticating the request took ${this.processTime(authComplete, authStart)}`)
        }

        for(const validation of this.router.getValidation()){
            logger?.log(`Validating the request from ${getName(validation)}`)
            const validationStart = performance.now()
            const validationInstance = new validation(request, response, logger)
            await validationInstance.validate()
            const validationEnd = performance.now()
            logger?.log(`Request id validated from ${getName(validation)}`, `Validating the request took ${this.processTime(validationEnd, validationStart)}`)
        }

        logger?.log(`Executing the method action for ${getName(this.action)}`)
        const executionStart = performance.now()
        const action = new this.action(request,response, logger)
        action.execute()
        const executionEnd = performance.now()
        logger?.log(`Method action is executed for ${getName(this.action)}`, `Executing method action took ${this.processTime(executionEnd, executionStart)}`)
        response.submit()
        const processEnd = performance.now()
        logger?.log("Sending the response to client", JSON.stringify(response.getBody()),`To complete the whole process took ${this.processTime(processEnd, processStart)}`)
        
        logger?.flush()
    }

    private processTime(end:number, start:number):string{
        const diff = end - start
        return `${diff.toFixed(2)}ms`
    }

}