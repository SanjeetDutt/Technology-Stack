import { Logger } from "../../Logger";
import Express from "express"
import { Server } from "../../Server";
import { IEndpoint, Endpoint } from "../Endpoint";

export class Request<
    B extends Endpoint.BODY = {},
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {}
>{
    private readonly expressRequest: Express.Request<P,B,Q>
    private readonly server: Server
    private readonly endpoint?: IEndpoint<B,P,Q,any>|undefined

    public readonly corelationId: string
    public readonly logger: Logger
    public readonly timestamp: Date
    

    public readonly body?: B
    // public readonly params: P
    // public readonly query: Partial<Q>

    constructor(
        server: Server,
        request: Express.Request<P,B,Q>,
        endpoint?: IEndpoint<B,P,Q,any>
    ){
        this.expressRequest = request
        this.server = server
        this.endpoint = endpoint

        this.corelationId = crypto.randomUUID()
        this.timestamp = new Date()
        this.logger = new Logger(this, server.getLogPath())

        // this.body = request.body
        // this.params = request.params as P
        // this.query = request.query as Partial<Q>

        this.logger.log(
            "A new request is created with Corelation-Id : " + this.corelationId,
            "URL Called : " + request.originalUrl,
            "Method : " + request.method,
            "Endpoint called : " + endpoint?.constructor.name || "NO endpoint found"
        )

    }
}