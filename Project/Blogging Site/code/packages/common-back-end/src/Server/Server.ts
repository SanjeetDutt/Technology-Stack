import Express from "express"
import { FileRouter } from "../FileRouter/types";
import { Request, Response } from "../FileRouter";
import { ServerError } from "../Error";

export class Server{

    private readonly port: number
    private readonly endpoints: FileRouter.EndpointExport[]
    private readonly logPath: string|undefined

    constructor(p:{port: number, endpoints: FileRouter.EndpointExport[], logPath: string|undefined}){
        this.port = p.port
        this.endpoints = p.endpoints
        this.logPath = p.logPath
    }

    public start(){
        // start express
        const application = Express()

        //Add endpoints
        for(const endpoint of this.endpoints){
            const path = endpoint.path
            const method = endpoint.method

            switch(method){
                case "POST":
                    application.post(path, this.handleApplicationRequest(endpoint))
                case "PUT":
                    application.put(path, this.handleApplicationRequest(endpoint))
                case "DELETE":
                    application.delete(path, this.handleApplicationRequest(endpoint))
                case "GET":
                    application.get(path, this.handleApplicationRequest(endpoint))
                case "PATCH":
                    application.patch(path, this.handleApplicationRequest(endpoint))
            }

        }
        
        //listen to a post
        application.listen(this.port,()=>{
            console.log("SERVER IS STARTED ON PORT : " + this.port)
        })
    }

    private handleApplicationRequest (endpointExport: FileRouter.EndpointExport){
        const {validation, authentication, errorBoundary, endpoint} = endpointExport
        return async (Erequest: Express.Request, Eresponse: Express.Response)=>{
            const request = new Request({
                logPath: this.logPath
            })
            const response = new Response()

            try{
                for(const _authentication of authentication){
                    request.logger.log(`Authenticating the request from ${_authentication.constructor.name}`)
                    await _authentication.authentication(request, response)
                    request.logger.log(`Request authenticated from ${_authentication.constructor.name}`)
                }
                for(const _validation of validation){
                    request.logger.log(`Validating the request from ${_validation.constructor.name}`)
                    await _validation.validation(request)
                    request.logger.log(`Request validated from ${_validation.constructor.name}`)
                }

                request.logger.log(`Calling the call function of ${endpoint.constructor.name}`)
                endpoint.call(request, response)
                request.logger.log(`Call successful from ${endpoint.constructor.name}`)
            } catch(e){
                request.logger.error("Encounter an error " + e)
                if(errorBoundary){
                    request.logger.log("Error catch by error boundary " + errorBoundary.constructor.name)
                    errorBoundary.errorBoundry(request, response, e as ServerError)
                }
            } finally{
                request.logger.flush()
            }
        }
    }
}