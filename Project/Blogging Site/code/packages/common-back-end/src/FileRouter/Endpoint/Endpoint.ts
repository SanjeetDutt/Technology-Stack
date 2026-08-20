import { Server } from "../../Server";
import { Request,Response } from "../Context";
import { IRouter } from "../Router";
import { Method, SubClass } from "../types";
import { _Action } from "./_Action";
import Express from "express"
import { _MethodAction } from "./Actions/_MethodAction";
import { Logger } from "../../Logger";

interface DefaultActionConfig {
    payload:{}
    response:{}
}
export class Endpoint{
    private readonly method: Method
    private readonly action: SubClass<_MethodAction<DefaultActionConfig>>
    private router?: IRouter
    private server?: Server

    constructor(method:Method, action: SubClass<_MethodAction<DefaultActionConfig>>){
        this.method = method
        this.action = action
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
        
        logger?.log("A new request made to server", `Endpoint: ${erequest.originalUrl}`)
        logger?.log(`Corelation ${request.corelationId} is created`)
        logger?.log("Params is parsed : " , JSON.stringify(erequest.params))
        logger?.log("Queries is parsed : " , JSON.stringify(erequest.query))
        logger?.log("Headers is parsed : " , JSON.stringify(erequest.headers))
        logger?.log("Payload is parsed : " , JSON.stringify(request.payload))

        const getName = (obj:any): string=>{
            return obj.name
        }

        for(const auth of this.router.getAuthentication()){
            logger?.log(`Authenticating the request from ${getName(auth)}`)
            const authInstance = new auth(request, response, logger)
            await authInstance.authenticate()
            logger?.log(`Request is authenticated from ${getName(auth)}`)
        }

        for(const validation of this.router.getValidation()){
            logger?.log(`Validating the request from ${getName(validation)}`)
            const validationInstance = new validation(request, response, logger)
            await validationInstance.validate()
            logger?.log(`Request id validated from ${getName(validation)}`)
        }

        logger?.log(`Executing the method action for ${getName(this.action)}`)
        const action = new this.action(request,response, logger)
        action.execute()
        logger?.log(`Method action is executed for ${getName(this.action)}`)

        logger?.flush()

        eresponse.json({
            message:"ALL GOOD FOR NOW"
        })
    }

    private logRequest(logger?: Logger, request?: Request, erequest?: Express.Request){
        if(!logger || !request || !erequest){
            return
        }

        // console.log(logger)
        const {log} = logger

        // New request reach to server
        log("A new request made to server", `Endpoint: ${erequest.originalUrl}`)
        // corelation creates
        log(`Corelation ${request.corelationId} is created`)
        // parsed params
        log("Params is parsed : " , JSON.stringify(request.param))
        // parsed query
        log("Queries is parsed : " , JSON.stringify(request.query))
        // parsed headers
        log("Headers is parsed : " , JSON.stringify(request.header))
        // parsed payload
        log("Payload is parsed : " , JSON.stringify(request.payload))
    }

}