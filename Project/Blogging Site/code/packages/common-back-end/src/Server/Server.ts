import Express from "express"
import { IEndpoint, Request, Response } from "../FileRouter";
import { ServerError } from "../Error";
import { NotFoundError } from "../Error/NotFoundError";

export class Server{

    private readonly port: number
    private readonly endpoints: IEndpoint[]
    private readonly logPath: string|undefined
    private readonly expressApplication: Express.Express

    constructor(p:{port: number, endpoints: IEndpoint[], logPath: string|undefined}){
        this.port = p.port
        this.endpoints = p.endpoints
        this.logPath = p.logPath
        this.expressApplication = Express()
    }

    getExpress(){
        return this.expressApplication
    }

    getLogPath(){
        return this.logPath
    }

    public start(){
        //Add endpoints
        this.endpoints.forEach(e=>e.register(this))

        //Ading root error boundary for 404
        this.expressApplication.use(async (req: Express.Request, res: Express.Response, next: Express.NextFunction)=>{
            const rootErrorBoundary = this.endpoints[0]?.getRootErrorBoundary()
            if(rootErrorBoundary){
                const request = Request.ErrorRequest(this, req, res, next)
                const response = Response.ErrorResponse(this, request, req, res, next)
                const serverError = new NotFoundError(``)
                await rootErrorBoundary.errorBoundry(request, response, serverError)
                request.logger.flush()
            } else{
                next()
            }
        })

        //listen to a post
        this.expressApplication.listen(this.port,()=>{
            console.log("SERVER IS STARTED ON PORT : " + this.port)
        })
    }
}