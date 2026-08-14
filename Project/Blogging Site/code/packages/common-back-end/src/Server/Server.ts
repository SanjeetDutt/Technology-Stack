import Express from "express"
import { CreateContext, CreateContextFromServer, IEndpoint, Request, Response } from "../FileRouter";
import { NotFoundError } from "../Error";

export class Server{

    private readonly port: number
    private readonly endpoints: IEndpoint<any, any, any, any>[]
    private readonly logPath: string|undefined
    private readonly expressApplication: Express.Express

    constructor(p:{port: number, endpoints: IEndpoint<any, any, any, any>[], logPath: string|undefined}){
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
                const [request, response] = CreateContextFromServer<any,any,any,any>(this,req,res,next)
                request.logger.error("Route not found for " + req.path)
                const serverError = new NotFoundError(``)
                await rootErrorBoundary.errorBoundary(serverError,request, response)
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