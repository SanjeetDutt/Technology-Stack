import { Logger } from "../../Logger";
import Express, { request } from "express"
import { Server } from "../../Server";
import { IEndpoint, Endpoint } from "../Endpoint";

export class Request<
    B extends Endpoint.BODY = {},
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {}
>{
    public readonly corelationId: string
    public readonly logger: Logger
    public readonly timestamp: Date
    public readonly expressRequest: Express.Request

    public readonly body: B
    // public readonly params: P
    // public readonly query: Partial<Q>


    constructor(params:{
        server: Server
        request: Express.Request<P,B,Q>
    }){
        this.expressRequest = request
        this.corelationId = crypto.randomUUID()
        this.timestamp = new Date()
        this.logger = new Logger(this, params.server.getLogPath())
        this.body = request.body
        // this.params = request.params as P
        // this.query = request.query as Partial<Q>

        this.logger.log("A new reques is created with Corelation-Id : " + this.corelationId)

    }
}