import { Logger } from "../Logger";
import Express, { request } from "express"
import { Server } from "../Server/Server";
import { IEndpoint, Endpoint } from "./Endpoint";

export class Request<
    B extends Endpoint.BODY,
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {}
>{
    public readonly corelationId: string
    public readonly logger: Logger
    public readonly timestamp: Date
    public readonly body: B

    constructor(params:{
        logPath: string | undefined
        request: Express.Request
    }){
        this.corelationId = crypto.randomUUID()
        this.timestamp = new Date()
        this.logger = new Logger(this, params.logPath)
        this.body = request.body as B
    }

    getPayload():B{
        return this.body
    }

    static Create<
        B extends Endpoint.BODY,
        P extends Endpoint.PARAMS,
        Q extends Endpoint.QUERY,
        R extends Endpoint.RESPONSE
    >(
        server: Server, 
        endpoint:IEndpoint<B,P,Q,R>, 
        express: {
            request:Express.Request, 
            response: Express.Response, 
            next: Express.NextFunction
        } 
    ){
        return new Request<B,P,Q>({
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