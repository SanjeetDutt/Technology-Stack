import { Server } from "../../Server";
import { IRouter } from "../Router";
import { AbstractEndpoint } from "./_Endpoint";
import { Endpoint, IEndpoint } from "./IEndpoint";
import {Request, Response} from "../Context"

export abstract class PostRoute<
    B extends Endpoint.BODY,
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {},
> 
extends AbstractEndpoint<B,P,Q,R>
implements IEndpoint<B,P,Q,R>
{
    constructor(router: IRouter){
        super("POST", router)
    }

    registerEndpoint(server:Server){
        server.getExpress().post(this.getPath(), this.handleApplicationRequest())
    }

    abstract call(request: Request<B,P,Q>, response: Response<R>):Promise<void> | void
}