import { Server } from "../../Server";
import { Endpoint, IEndpoint } from "../Endpoint";
import { Request } from "./Request";
import {Response} from "./Response"
import Express from "express"

export const CreateContext = <
    B extends Endpoint.BODY,
    P extends Endpoint.PARAMS,
    Q extends Endpoint.QUERY,
    R extends Endpoint.RESPONSE
>(
    endpoint: IEndpoint<B,P,Q,R>,
    Erequest:Express.Request<P,B,Q>, 
    Eresponse:Express.Response, 
    next: Express.NextFunction
):[Request<B,P,Q>, Response<R>]=>{
    const server = endpoint.getServer()
    return CreateContextFromServer<B,P,Q,R>(server, Erequest, Eresponse, next)
}

export const CreateContextFromServer = <
    B extends Endpoint.BODY,
    P extends Endpoint.PARAMS,
    Q extends Endpoint.QUERY,
    R extends Endpoint.RESPONSE
>(
    server: Server,
    Erequest:Express.Request<P,B,Q>, 
    Eresponse:Express.Response, 
    next: Express.NextFunction,
):[Request<B,P,Q>, Response<R>]=>{
    const request = new Request<B,P,Q>({
        server: server,
        request: Erequest,
    })

    const response = new Response<R>({
        request: request,
        response: Eresponse
    })

    return [request, response]
}