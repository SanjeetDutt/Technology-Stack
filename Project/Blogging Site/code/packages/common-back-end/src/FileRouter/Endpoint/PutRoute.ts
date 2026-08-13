import { Server } from "../../Server";
import { IRouter } from "../Router";
import { AbstractEndpoint } from "./_Endpoint";
import { Endpoint } from "./IEndpoint";

export abstract class PutRoute<
    B extends Endpoint.BODY,
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {},
> extends AbstractEndpoint<B,P,Q,R>
{
    constructor(router: IRouter){
        super("PUT", router)
    }

    register(server:Server){
        server.getExpress().put(this.getPath(), this.handleApplicationRequest(server))
    }

    abstract call():void
}