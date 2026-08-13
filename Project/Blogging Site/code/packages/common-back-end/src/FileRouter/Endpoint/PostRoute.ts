import { Server } from "../../Server";
import { IRouter } from "../Router";
import { AbstractEndpoint } from "./_Endpoint";
import { Endpoint } from "./IEndpoint";

export abstract class PostRoute<
    B extends Endpoint.BODY,
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {},
> extends AbstractEndpoint<B,P,Q,R>
{
    constructor(router: IRouter){
        super("POST", router)
    }

    register(server:Server){
        server.getExpress().post(this.getPath(), this.handleApplicationRequest(server))
    }

    abstract call():void
}