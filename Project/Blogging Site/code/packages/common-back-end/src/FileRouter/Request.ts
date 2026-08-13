import { Logger } from "../Logger";
import Express from "express"
import { Server } from "../Server/Server";
import { IEndpoint } from "./Endpoint";

export class Request{
    public readonly corelationId: string
    public readonly logger: Logger
    public readonly timestamp: Date

    constructor(params:{
        logPath: string | undefined
        request: Express.Request
    }){
        this.corelationId = crypto.randomUUID()
        this.timestamp = new Date()
        this.logger = new Logger(this, params.logPath)
    }

    static Create(
        server: Server, 
        endpoint:IEndpoint, 
        express: {
            request:Express.Request, 
            response: Express.Response, 
            next: Express.NextFunction
        } 
    ){
        return new Request({
            logPath: server.getLogPath(),
            request: express.request
        })
    }

    static ErrorRequest(
        server: Server,
        request:Express.Request, 
        response: Express.Response, 
        next: Express.NextFunction
    ){
        return new Request({
            logPath: server.getLogPath(),
            request: request
        })
    }
}