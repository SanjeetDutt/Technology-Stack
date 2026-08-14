import { Server } from "../../Server";
import { IRouter } from "../Router";
import { AbstractEndpoint } from "./_Endpoint";
import { Endpoint } from "./IEndpoint";

export abstract class PatchRoute<
    B extends Endpoint.BODY,
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {},
> extends AbstractEndpoint<B,P,Q,R>
{
    constructor(router: IRouter){
        super("PATCH", router)
    }

    registerEndpoint(server:Server){
        server.getExpress().patch(this.getPath(), this.handleApplicationRequest())
    }
}