import { NextFunction, Request, Response } from "express";
import { FileRouter  } from "./FileRouter.d";
import {Request as _Request} from "./Request"
import {Response as _Response} from "./Response"
import { ServerError } from "../Error";
import { Unkempt } from "next/font/google";

export class Endpoint{
    private readonly method: FileRouter.Method
    private readonly url: FileRouter.Path
    private readonly fn: FileRouter.MethodHandler
    private readonly auth: FileRouter.MethodHandler[] | undefined
    private readonly validation: FileRouter.MethodHandler[] | undefined
    private readonly error: FileRouter.ErrorHandler | undefined
    private logPath: string|undefined

    constructor(p: {
        method: FileRouter.Method, 
        url: FileRouter.Path, 
        auth?: FileRouter.MethodHandler[], 
        error?: FileRouter.ErrorHandler, 
        validation?: FileRouter.MethodHandler[]
        handler: FileRouter.MethodHandler
    }){
        this.method = p.method
        this.url = p.url
        this.auth = p.auth
        this.error = p.error
        this.fn = p.handler
        this.validation = p.validation
    }

    getMethod(){
        return this.method
    }

    getURL(){
        return this.url
    }

    addLoggerPath(path: string|undefined){
        this.logPath = path
    }

    async handleRequest(req: Request, res: Response, next: NextFunction){
        
        const request = new _Request()
        const response = new _Response(request.getCorelationId())

        try{
            // Prepare request and response DTO
            request
                .addHeaders(req.headers)
            
            request.logger.log("New request created", request)


            // HANDLE AUTH
            if(this.auth){
                for(const auth of this.auth){
                    const data = await auth(request, response)
                    response.addBody(data)
                }
            }
            // Handle Validations
            if(this.validation){
                for(const validation of this.validation){
                    await validation(request, response)
                }
            }

            // HANDLE SERVICE
            const data = await this.fn(request, response)
            response.addBody(data)

            // Convert Response to Express Response and send to FE
            res
                .status(response.getStatus())
                .header(response.getHeaders())
                .send(response.getBody())
            

        } catch(e:unknown){
            const error = e as Error
            const errorObj = {
                title: "An error encounter while resolving a request",
                request,
                stack: error.stack || "No stack attached",
                cause: error.cause || "No cause attached",
                code:"",
                message:""
            }
            if(e instanceof ServerError){
                res
                    .status(e.getCode())
                    .json(e.getMessage())
                errorObj.code = String(e.getCode())
                errorObj.message = e.getMessage()

            } else {
                res
                    .status(500)
                    .send(e)
            }
            const {title, ...restObj} = errorObj
            request.logger.error(title, restObj)
        } finally{
            if(this.logPath){
                request.logger.flush(this.logPath)
            }
            
        }
    
    }
}