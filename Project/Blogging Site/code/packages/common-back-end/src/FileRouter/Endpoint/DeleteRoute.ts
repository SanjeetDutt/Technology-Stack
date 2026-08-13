import { Server } from "../../Server/Server";
import { IRouter } from "../Router";
import { AbstractEndpoint } from "./_Endpoint";
import { Endpoint } from "./IEndpoint";

export abstract class DeleteRoute<
    B extends Endpoint.BODY,
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {},
> extends AbstractEndpoint<B,P,Q,R>
{
    constructor(router: IRouter){
        super("DELETE", router)
    }

    register(server:Server){
        server.getExpress().delete(this.getPath(), this.handleApplicationRequest(server))
    }
}