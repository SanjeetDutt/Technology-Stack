import { Server } from "../Server/Server";
import { Endpoint, IEndpoint } from "./Endpoint";
import { Request } from "./Request";
import Express from "express"

export class Response<
    B extends Endpoint.BODY,
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {}
>{
    private status: number = 200

    constructor(params:{
        request: Request<B,P,Q>,
        response: Express.Response
    }){}

    static Create<
        B extends Endpoint.BODY,
        P extends Endpoint.PARAMS,
        Q extends Endpoint.QUERY,
        R extends Endpoint.RESPONSE
    >(
        server: Server, 
        endpoint:IEndpoint<B,P,Q,R>, 
        request: Request<B,P,Q>,
        express: {
            request:Express.Request, 
            response: Express.Response, 
            next: Express.NextFunction
        } 
    ){

        return new Response<B,R,P,Q>({
            request: request,
            response: express.response
        })

    }

    static ErrorResponse<
        B extends Endpoint.BODY,
        P extends Endpoint.PARAMS,
        Q extends Endpoint.QUERY
    >(
        server: Server,
        req: Request<B,P,Q>,
        request:Express.Request, 
        response: Express.Response, 
        next: Express.NextFunction
    ){
        return new Response({
            request: req,
            response: response
        })
    }
}